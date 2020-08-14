<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class SupportNotify extends Mailable
{
    use Queueable, SerializesModels;

    public $support;
    /**
     * Create a new message instance.
     *
     * @return void
     */
    public function __construct($support)
    {
        $this->support = $support;
    }

    /**
     * Build the message.
     *
     * @return $this
     */
    public function build()
    {
        return $this->markdown('emails.support.notify')->subject("INC#" . $this->support->id . ", " . $this->support->subject);
    }
}
