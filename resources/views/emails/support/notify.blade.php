@component('mail::message')


Name: {{$support->name}}
<br />
Email: {{$support->email}}
<br />
Message: "{{$support->body}}"
<br />
When: {{$support->created_at}}
<br />

@component('mail::button', ['url' => url('')])
Go to {{ config('app.name') }}
@endcomponent

@endcomponent
