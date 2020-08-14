@extends('layouts.app')

@section('content')
<div class="container">
    <div class="row justify-content-center">
        <div class="col-md-8">
            <div class="card">

                <div class="card-body">

                    @if(!empty($user))
                    <div class="form-group row">
                        <label>Email:</label>
                        <input type="text" class="form-control" value="{{$user->email}}">
                    </div>
                    @endif
                </div>
            </div>
        </div>
    </div>
</div>
@endsection
