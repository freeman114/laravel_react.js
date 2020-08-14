<table>
    <thead>
    <tr>
        <th><b>Question Id</b></th>
        <th><b>Question Text</b></th>
        <th><b>Answer</b></th>

    </tr>
    </thead>
    <tbody>
    @foreach($instances as $instance)
        <tr>
            <td>{{ $instance["question_id"] }}</td>
            <td>{{ $instance["question_text"] }}</td>
            <td>{{ $instance["answer"] }}</td>
        </tr>
    @endforeach

    </tbody>
</table>
