@extends('layouts.page')

@section('content')
    <style type="text/css">.mailpoet_hp_email_label {
            display: none !important;
        }

        #mailpoet_form_1 .mailpoet_form {
            padding: 10px;
        }

        #mailpoet_form_1 .mailpoet_column_with_background {
            padding: 10px;
        }

        #mailpoet_form_1 .mailpoet_form_column:not(:first-child) {
            margin-left: 20px;
        }

        #mailpoet_form_1 .mailpoet_paragraph {
            line-height: 20px;
            margin-bottom: 20px;
        }

        #mailpoet_form_1 .mailpoet_segment_label, #mailpoet_form_1 .mailpoet_text_label, #mailpoet_form_1 .mailpoet_textarea_label, #mailpoet_form_1 .mailpoet_select_label, #mailpoet_form_1 .mailpoet_radio_label, #mailpoet_form_1 .mailpoet_checkbox_label, #mailpoet_form_1 .mailpoet_list_label, #mailpoet_form_1 .mailpoet_date_label {
            display: block;
            font-weight: normal;
        }

        #mailpoet_form_1 .mailpoet_text, #mailpoet_form_1 .mailpoet_textarea, #mailpoet_form_1 .mailpoet_select, #mailpoet_form_1 .mailpoet_date_month, #mailpoet_form_1 .mailpoet_date_day, #mailpoet_form_1 .mailpoet_date_year, #mailpoet_form_1 .mailpoet_date {
            display: block;
        }

        #mailpoet_form_1 .mailpoet_text, #mailpoet_form_1 .mailpoet_textarea {
            width: 200px;
        }

        #mailpoet_form_1 .mailpoet_checkbox {
        }

        #mailpoet_form_1 .mailpoet_submit {
        }

        #mailpoet_form_1 .mailpoet_divider {
        }

        #mailpoet_form_1 .mailpoet_message {
        }

        #mailpoet_form_1 .mailpoet_validate_success {
            font-weight: 600;
            color: #468847;
        }

        #mailpoet_form_1 .mailpoet_validate_error {
            color: #b94a48;
        }

        #mailpoet_form_1 .mailpoet_form_loading {
            width: 30px;
            text-align: center;
            line-height: normal;
        }

        #mailpoet_form_1 .mailpoet_form_loading > span {
            width: 5px;
            height: 5px;
            background-color: #5b5b5b;
        }

        .sub-error, .sub-success {
            padding: 20px;
            color: white;
        }

        .sub-error {
            background-color: #f44336;
        }

        .sub-success {
            background-color: #4CAF50
        }

        .sub-closebtn {
            margin-left: 15px;
            color: white;
            font-weight: bold;
            float: right;
            font-size: 22px;
            line-height: 20px;
            cursor: pointer;
            transition: 0.3s;
        }

        .sub-closebtn:hover {
            color: black;
        }
    </style>
    <div class="middle_inner">

        <div id="cmsmasters_row_b7rpcj1deu"
             class="cmsmasters_row cmsmasters_color_scheme_default cmsmasters_row_top_default cmsmasters_row_bot_default cmsmasters_row_boxed">
            <div class="cmsmasters_row_outer_parent">

                <div class="cmsmasters_row_outer">
                    <div class="cmsmasters_row_inner">
                        <div class="cmsmasters_row_margin">

                            <div id=""
                                 class="cmsmasters_row cmsmasters_color_scheme_default cmsmasters_row_top_default cmsmasters_row_bot_default cmsmasters_row_boxed">
                                <div class="cmsmasters_row_outer_parent">
                                    <div class="cmsmasters_row_outer">
                                        <div class="cmsmasters_row_inner">
                                            <div class="cmsmasters_row_margin">


                                                <div id="cmsmasters_column_3qork8qpd" class="cmsmasters_column ">
                                                    <div class="cmsmasters_column_inner">
                                                        <div id="cmsmasters_heading_4j07sp0cxv"
                                                             class="cmsmasters_heading_wrap cmsmasters_heading_align_left">
                                                            <h2 class="cmsmasters_heading">Contact us with anything
                                                                releated to assisted living or senior care software
                                                                development</h2>
                                                        </div>

                                                        <div id="cmsmasters_heading_k2vdx8hntp"
                                                             class="cmsmasters_heading_wrap cmsmasters_heading_align_left">
                                                            <h4 class="cmsmasters_heading">If you have business
                                                                inquiries or other questions, please fill out the
                                                                following form to contact us. Thank you.</h4>
                                                        </div>

                                                        @if(session()->has('success'))
                                                            <div id="subscribeSuccess" class="sub-success">
                                                                <span class="sub-closebtn"
                                                                      onclick="this.parentElement.style.display='none';">×</span>
                                                                {{ session()->get('success') }}
                                                            </div>
                                                        @else
                                                        @endif

                                                        <div class="cmsmasters_mailpoet">

                                                            <div id="mailpoet_form_1"
                                                                 class="mailpoet_form mailpoet_form_shortcode">



                                                                <form
                                                                    class="mailpoet_form mailpoet_form_form mailpoet_form_shortcode one_half"
                                                                    action="{{route("contact.submit")}}" method="POST">
                                                                    {{ csrf_field() }}

                                                                    <div class="mailpoet_paragraph"><label
                                                                            class="mailpoet_text_label"
                                                                            data-automation-id="form_first_name_label">Name</label>
                                                                        <input type="text" id="subscribeName"
                                                                               class="mailpoet_text"
                                                                               name="name"
                                                                               title="Name" value="{{old("name")}}"
                                                                               data-automation-id="form_first_name"/>
                                                                    </div>
                                                                    <div class="mailpoet_paragraph"><label
                                                                            class="mailpoet_text_label"
                                                                            data-automation-id="form_email_label">Email
                                                                            <span
                                                                                class="mailpoet_required">*</span></label><input
                                                                            type="email"
                                                                            class="mailpoet_text {{ $errors->has('email') ? 'has-error' : '' }}"
                                                                            title="Email"
                                                                            value="{{old("email")}}"
                                                                            name="email"/>
                                                                        @if ($errors->has('email'))
                                                                            <span class="help-block">
                                                                                            <strong>{{ $errors->first('email') }}</strong>
                                                                                    </span>
                                                                        @endif
                                                                    </div>
                                                                    <div class="mailpoet_paragraph"><label
                                                                            class="mailpoet_text_label"
                                                                            data-automation-id="form_first_name_label">Subject</label>
                                                                        <input type="text"
                                                                               name="subject"
                                                                               class="mailpoet_text"
                                                                               title="Subject"
                                                                               value="{{old("subject")}}"/>
                                                                    </div>
                                                                    <div class="mailpoet_paragraph"><label
                                                                            class="mailpoet_textarea_label"
                                                                            data-automation-id="form_first_name_label">Body</label>

                                                                        <textarea name="body"
                                                                                  class="mailpoet_textarea {{ $errors->has('body') ? 'has-error' : '' }}"
                                                                                  style="width: 100%">{{old("body")}}</textarea>
                                                                        @if ($errors->has('body'))
                                                                            <span class="help-block">
                                                                                            <strong>{{ $errors->first('body') }}</strong>
                                                                                    </span>
                                                                        @endif

                                                                    </div>
                                                                    <div class="mailpoet_paragraph">
                                                                        <label
                                                                            class="mailpoet_textarea_label"
                                                                            data-automation-id="form_first_name_label">Verification
                                                                            Code</label>

                                                                        <div
                                                                            style="margin-top: 5px; margin-bottom: 5px; display: flex;">

                                                                            <div id="captcha_img"
                                                                                 class="one_third">{!! captcha_img() !!}</div>
                                                                            <div class="one_third">
                                                                                <button type="button"
                                                                                        class="btn btn-success btn-refresh">
                                                                                    <i class="fa fa-refresh"></i>
                                                                                </button>
                                                                            </div>


                                                                        </div>

                                                                        <div><input id="captcha"
                                                                                    type="text"
                                                                                    class="form-control {{ $errors->has('captcha') ? 'has-error' : '' }}"
                                                                                    name="captcha" autocomplete="off">
                                                                        </div>

                                                                        @if ($errors->has('captcha'))
                                                                            <span class="help-block">
                                                                                            <strong>{{ $errors->first('captcha') }}</strong>
                                                                                    </span>
                                                                        @endif
                                                                    </div>


                                                                    <div class="mailpoet_paragraph">
                                                                        <input
                                                                            type="submit" class="mailpoet_submit"
                                                                            value="Submit"/>
                                                                    </div>


                                                                </form>
                                                            </div>
                                                        </div>

                                                    </div>

                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>

    </div>

    <script type="text/javascript">


        jQuery(".btn-refresh").click(function () {
            jQuery.ajax({
                type: 'GET',
                url: '/api/refresh_captcha',
                success: function (data) {
                    jQuery("#captcha_img").html(data.captcha);
                }
            });
        });


    </script>
@endsection


