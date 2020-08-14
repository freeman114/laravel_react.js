<?php

namespace App\Exceptions;

use ErrorException;
use Exception;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * A list of the exception types that are not reported.
     *
     * @var array
     */
    protected $dontReport = [
        //
    ];

    /**
     * A list of the inputs that are never flashed for validation exceptions.
     *
     * @var array
     */
    protected $dontFlash = [
        'password',
        'password_confirmation',
    ];

    /**
     * Report or log an exception.
     *
     * @param \Throwable $exception
     * @return void
     *
     * @throws \Exception
     */
    public function report(Throwable $exception)
    {
        parent::report($exception);
    }

    private function customApiResponse($exception)
    {
        if (method_exists($exception, 'getStatusCode')) {
            $statusCode = $exception->getStatusCode();
        } else {
            $statusCode = 500;
        }

        $response = [];
        $response['status'] = "fail";

        switch ($statusCode) {
            case 401:
                $response['msg'] = 'Unauthorized';
                break;
            case 403:
                $response['msg'] = 'Forbidden';
                break;
            case 404:
                $response['msg'] = 'Not Found';
                break;
            case 405:
                $response['msg'] = 'Method Not Allowed';
                break;
            case 422:
                $response['msg'] = $exception->original['message'];
                $response['errors'] = $exception->original['errors'];
                break;
            default:
                $response['msg'] = ($statusCode == 500) ? 'Whoops, looks like something went wrong' : $exception->getMessage();
                break;
        }

        return response()->json($response, $statusCode);
    }

    private function handleApiException($request, Exception $exception)
    {
        $exception = $this->prepareException($exception);

        if ($this->isHttpException($exception)) {
            $exception = $exception->getResponse();
        }

        if ($exception instanceof \Illuminate\Auth\AuthenticationException) {
            $exception = $this->unauthenticated($request, $exception);
        }

        if ($exception instanceof \Illuminate\Validation\ValidationException) {
            $exception = $this->convertValidationExceptionToResponse($exception, $request);
        }

        return $this->customApiResponse($exception);
    }

    /**
     * Render an exception into an HTTP response.
     *
     * @param \Illuminate\Http\Request $request
     * @param \Throwable $exception
     * @return \Symfony\Component\HttpFoundation\Response
     *
     * @throws \Throwable
     */
    public function render($request, Throwable $exception)
    {
        if ($request->ajax() || $request->wantsJson()) {

            return $this->handleApiException($request, $exception);
        } else {
            switch ($exception) {

                case $this->isHttpException($exception):
                    $status = $exception->getStatusCode();

                    if (view()->exists('errors.' . $status)) {
                        return response()->view('errors.' . $status, [], $status);
                    }

                    break;
                default:
                    break;
            }
        }

        return parent::render($request, $exception);
    }
}
