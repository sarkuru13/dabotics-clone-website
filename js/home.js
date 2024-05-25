
//function work for form validation 

function validateForm(targetFlag) {

    var isValidForm = true;

    $('#' + targetFlag).attr('novalidate', 'novalidate');

    $('#' + targetFlag + ' [required]').each(function() {

        if ($(this).is("select") && $(this).val() == '') {

            $(this).closest('div').addClass('errorDropdown');

            isValidForm = false;

        } else if ($(this).is(":file") && $(this).val() == '') {

            $(this).addClass('errorFileType');

            isValidForm = false;

        } else if ($(this).is("textarea") && $(this).val() == '') {

            $(this).addClass('errorTextArea');

            isValidForm = false;

        } else if ($(this).is(":checkbox") && $(this).is(":not(:checked)")) {

            $(this).closest('label').addClass('errorCheckBox');

            isValidForm = false;

        } else if ($(this).is("input:radio")) {

            var radioBtnName = $(this).attr('name');

            if ($("input[name=" + radioBtnName + "]:checked").length <= 0) {

                $(this).closest('div').parent('div').addClass('errorRadio');

                isValidForm = false;

            } else if ($(this).is(":not(:checked)") && !radioBtnName) {

                $(this).closest('div').parent('div').addClass('errorRadio');

                isValidForm = false;

            }

        } else if ($(this).val() == '') {

            $(this).addClass('errorInput');

            isValidForm = false;

        }

    });

    return isValidForm;

}





$(document).on('keypress', '.numericOnly, .percengateOnly, .timeOnly, .alphanumericOnly, .invoicenumberOnly, .numbersonlynegativeOnly, .integersOnly', function(event) {

    if ($(this).hasClass('numericOnly')) {

        return numericOnly(this, event);

    } else if ($(this).hasClass('percengateOnly')) {

        return percengateOnly(this, event);

    } else if ($(this).hasClass('timeOnly')) {

        return timeOnly(this, event);

    } else if ($(this).hasClass('alphanumericOnly')) {

        return alphanumericOnly(this, event);

    } else if ($(this).hasClass('invoicenumberOnly')) {

        return invoicenumberOnly(this, event);

    } else if ($(this).hasClass('numbersonlynegativeOnly')) {

        return numbersonlynegativeOnly(this, event);

    } else if ($(this).hasClass('integersOnly')) {

        return integersOnly(this, event);

    }

});



function numericOnly(t, e) {

    return validateInput(t, e, new RegExp("^[0-9]*([.:][0-9]*)?$"))

}



function percengateOnly(t, e) {

    var i = new RegExp("^[0-9]{0,2}(\\.[0-9]*)?$|^1?0{0,2}(\\.0*)?$");

    return validateInput(t, e, i)

}



function timeOnly(t, e) {

    return validateInput(t, e, new RegExp("^[0-9]*([.:][0-9]{0,2})?$"))

}



function alphanumericOnly(t, e) {

    return validateInput(t, e, new RegExp("^[0-9a-zA-Z]*$"))

}



function invoicenumberOnly(t, e) {

    return validateInput(t, e, new RegExp("^[A-Za-z0-9 #,./:_-]*$"))

}



function numbersonlynegativeOnly(t, e) {

    return validateInput(t, e, new RegExp("^-?[0-9]*([.][0-9]*)?$"))

}



function integersOnly(t, e) {

    return validateInput(t, e, new RegExp("^[0-9]*$"))

}



function validateInput(t, e, i) {

    var n = t.value;

    $(t).unbind("paste.validateInput"), $(t).bind("paste.validateInput", function() {

        setTimeout(function() {

            i.test(t.value) ? n = t.value : $(t).val(n)

        }, 10)

    });

    var r = jQuery.event.fix(e || window.event);

    if (!isPrintableKey(r)) return !0;

    var a = getFinalValue(t, r);

    return i.test(a);

}

function isPrintableKey(t) {

    if (t.ctrlKey || t.metaKey) return !1;

    var e = t.which;

    return 32 > e || 144 == e ? !1 : !0

}



function getFinalValue(t, e) {

    var i = TextSelection.startPos(t),

        n = TextSelection.endPos(t),



        r = t.value,

        a = String.fromCharCode(e.which),

        s = r.substring(0, i),

        o = r.substring(n, r.length);

    return s + a + o

}

var TextSelection = {

    current: function() {

        return document.getSelection ? document.getSelection().toString() : document.selection ? document.selection.createRange().text : void 0

    },

    selectedValue: function(t) {

        return void 0 !== t.selectionStart ? t.value.substring(t.selectionStart, t.selectionEnd) : document.selection ? document.selection.createRange().text : void 0

    },

    startPos: function(t) {

        if (void 0 !== t.selectionStart) return t.selectionStart;

        if (document.selection) {

            var e = document.selection.createRange();

            return e.moveEnd("character", t.value.length), t.value.length - e.text.length

        }

    },

    endPos: function(t) {

        if (void 0 !== t.selectionEnd) return t.selectionEnd;

        if (document.selection) {

            var e = document.selection.createRange();

            return e.moveStart("character", -t.value.length), e.text.length

        }

    }

};

//function work for submit Resume
$(document).on("submit", "#resume_form", function(e) {
	e.preventDefault();
	//if (!validateForm('resume_form')) return false; 
    $.ajax({
		url: base_url+'pages/resume_upload',
        dataType: 'json',
        type: 'POST',
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function(data) {
				alert('Resume has been successfully submited!');				
        },
        error: function() {}
    });
});


//function work for submit Carer Resume
$(document).on("submit", "#resume_uploadform", function(e) {
	e.preventDefault();
	if (!validateForm('resume_uploadform')) return false; 
    $.ajax({
		url: base_url+'pages/job_upload',
        dataType: 'json',
        type: 'POST',
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function(data) {
				$('.ctrlVal').val('');
				$('.ctrlVal').html('');
				$('#check5').prop("checked", false );
				$("select#country").val('0');
				alert('Details sent successfully!');				
        },
        error: function() {}
    });
});


//function work for user registeration form submit
$(document).on("submit", "#register_form", function(e) {
	e.preventDefault();
	//if (!validateForm('register_form')) return false; 
    var fld_customer_name = $('#fld_customer_name').val();
    var emailVal = $('#emailVal').val();
    var fld_customer_address = $('#fld_customer_address').val();
    var phoneVal     = $('#phoneVal').val();
    var password1    = $('#password1').val();
    var matchPasswd1 = $('#matchPasswd1').val();
    var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    var ch = $("#check5").is(':checked');

    

    if(fld_customer_name.trim() == ''){
        $('#nameerror').html('Please enter your name!');
         return false;
       }
       else { 
         $('#nameerror').html('');
       }
 
    if(emailVal.search(emailRegEx) == -1){

         $('#emailerror').html('Please enter your valid email!');
         return false;
    }
    else { 
        $('#emailerror').html('');
       
    }
    if(fld_customer_address.trim() == ''){
          
     $('#addresserror').html('Please enter your address!');
         return false;
       }
       else { 
         $('#addresserror').html('');
       
    }
    
    if(phoneVal.trim() == '' || phoneVal.length != '10'){
        $('#phoneerror').html("Enter your 10 digits number!");
        return false;
    }
    else{ 
         $('#phoneerror').html('');
       
    }

    if(password1.trim() !='' && matchPasswd1.trim() !=''){
        if (password1 != matchPasswd1) {
            $('#passerror').html("Passwords do not match!");
            return false;
        }
        else{
            $('#passerror').html("");
        }
    }
    else{
      $('#passerror').html("Enter password and confirm password!");
       return false;
    }
    if(ch == false){
        $('.checkmark1').html('Please accept terms and conditions!');
        return false;
    }
    else { 
        $('.checkmark1').html('');
    }

    $.ajax({
		url: base_url+'register/create',
        dataType: 'json',
        type: 'POST',
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function(data) {
                var result = data['id'];
				$('.ctrlVal').val('');
				if(result == '1'){
					// alert('Email-id alreasy exist!');
                    $('#r1').html('Email already exists');
                    setTimeout(function() {
                        $('#r1').html('');
                    }, 6000);
				}
				if(result == '2'){
					// alert('Your registration has been completed successfully. Please check your email!');
                    $('#r1').html('Your registration has been completed successfully. Please check your email!');
                    setTimeout(function() {
                        $('#r1').html('');
                    }, 6000);
				}
				if(result == '3'){
					// alert('Error!');
                    $('#r1').html('Oops something want worng. ');
                    setTimeout(function() {
                        $('#r1').html('');
                    }, 6000);
				}
        },
        error: function() {}
    });
});


//function work for home free booking form submit













//function work for user registeration form submit
$(document).on("submit", "#login_form", function(e) {
	e.preventDefault();
    var email = $('#loginemail').val();
    var password = $('#loginpassword').val();
    var emailRegEx = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if(email.search(emailRegEx) == -1){
        $('#eerr').html('Enter valid email id');
        return false;
    }
    else{
        $('#eerr').html('');
    }
    if(password.trim() == ''){
        $('#perr').html('Enter valid password');
        return false;
    }
    else{
        $('#perr').html('');
    }

	//if (!validateForm('login_form')) return false; 
    $.ajax({
		url: base_url+'login/do_login',
        dataType: 'json',
        type: 'POST',
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function(data) {
                var result = data['id'];
				if(result == '2'){
					$('#r2').html('Check for correct username and password!');
                    setTimeout(function() {
                        $('#r2').html('');
                    }, 6000);
				}else{
					window.location.href = base_url+'dashboard';
			   }
        },
        error: function() {}
    });
});


//function work for user registeration form submit
$(document).on("submit", "#checkout_form", function(e) { 
	e.preventDefault();
	if (!validateForm('checkout_form')) return false; 
    $.ajax({
		url: base_url+'pages/paynow',
        dataType: 'json',
        type: 'POST',
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function(data) { 
                var result = data['id'];
				$('.ctrlVal').val('');
        },
        error: function() {}
    });
});


//function work for user registeration form submit
$(document).on("submit", "#checkout_form1", function(e) { 
	e.preventDefault();
	if (!validateForm('checkout_form')) return false; 
    $.ajax({
		   
		   url: base_url+'pages/paynow',
		   
		   });
});



function checkFile(){
	var val = $("#imgInp").val();
	if (!val.match(/(?:pdf|doc|docx)$/)) {
		alert('Please Select File!')
	}
}

function validateEmail(email) {
  var emailReg = /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/;
  return emailReg.test(email);
}


function checkEmail(emailaddress){
	if( !validateEmail(emailaddress)) {
			alert('Enter Your Email!');
			$('#emailVal').val('');
	}
}

function validateNumber(mobile) {
        var pattern = /^\d{10}$/;
        if (pattern.test(mobile)) {
            return true;
        }else{
       		 $('#phoneerror').html("Enter your 10 digits number!");
			 $('#phoneVal').val('');
        	return false;
		}
    }

function validatePasswordLength(password) {
        var pattern = /^\d{6}$/;
        if (pattern.test(password)) {
            return true;
        }else{
       		 alert("It is not valid password.input atleast 6 character!");
			 $('#password').val('');
        	return false;
		}
    }

function ValidateMatchPswd() {
        var password =  $('#password').val();
        var confirmPassword = $('#matchPasswd').val();
        if(password!='' && confirmPassword!=''){
			if (password != confirmPassword) {
				alert("Passwords do not match.");
				 $('#matchPasswd').val('');
				return false;
			}
			return true;
		}
    }
	
	
	
	$(document).on("submit", "#checkout", function(e) {
	//e.preventDefault();console.log(validateForm('checkout'));
	if (!validateForm('checkout')) return false; 
	
	
	$( "#checkout" ).submit();

});

	

//Add to cart module Starts

function cart(prd_id,prd_name,prd_price,prd_title,program_id,percentage,all_tax,main_price)
{   
   if(prd_id != "")
   {  
	   var dataString = 'prdId='+prd_id+'&prod_name='+prd_name+'&price='+prd_price+'&title='+prd_title+'&program_id='+program_id+'&percentage='+percentage+'&all_tax='+all_tax+'&main_price='+main_price;
       $.ajax({
		url: base_url+'cart/add',
        dataType: 'json',
        type: 'POST',
		data: dataString,    
        success: function(data) {
				var result = data['id'];

				if(result == '1'){
                	//alert('Course Added to Cart');
					location.reload();
				}else{
					alert('Oops! Something Wrong');	
				}
        },
        error: function() {}
    });

//		$jsmart.ajax({ 
//				type: "POST",  
//				dataType: "json", 
//				url: sws_url+"/cart/add",   
//				data: dataString,    
//				success: function(data){
//				alert('Product Added to Cart');
//				var cart_html,key;
//				var grand_total = 0;
//				cart_html = '<ul class="list-mini-cart-item">';
//				Object.keys(data).forEach(function(key) {
//				var value = data[key];
//				if (typeof value.name !== "undefined") {
//					cart_html += '<li><div class="mini-cart-thumb"><a><img class="img-responsive" src="'+sws_url+'/images/thumbs/'+value.image+'" alt="p10"></a></div><div class="mini-cart-info"><h3><a href="#">'+value.name+'</a></h3></div><div class="mini-cart-info" style="padding-right: 5px;"><div class="info-price"><span><i class="fa fa-rupee"></i> '+value.subtotal+'</span></div><div class="qty-product"><span>'+value.qty+'</span></div></div><div class="mini-cart-edit"><a class="delete-mini-cart-item" href="'+sws_url+'/cart/remove/'+value.rowid+'"><i class="fa fa-trash-o"></i></a></div></li>';
//					grand_total = grand_total + value.subtotal;
//				}
//				});				
//				
//				cart_html +='</ul><div class="mini-cart-total text-right"><label>TOTAL : '+grand_total+'</label></div><div class="mini-cart-button"><a class="mini-cart-view" href="'+sws_url+'/cart">view my cart </a><a class="mini-cart-checkout" href="'+sws_url+'/checkout">Checkout</a></div>';
//
//				$jsmart("#minicart").html(cart_html);
//				$jsmart("#total").text(data['total']);
//				},
//				error:function(data){
//					alert('Oops! Something Wrong');
//				}                 
//        }); 
   }
}
//Add to cart module Ends


//function work for request-call-back form submit
$(document).on("submit", "#contact_request_form", function(e) {
	e.preventDefault();
	if (!validateForm('contact_request_form')) return false; 
    $.ajax({
		url: base_url+'home/user_request',
        dataType: 'json',
        type: 'POST',
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function(data) {
				$('.ctrlVal').val('');
				$("select#courses").val(''); 
				$("select#category").val(''); 
				alert('Thank you. We will touch you soon!"!');
        },
        error: function() {}
    });
});

//function work for request-call-back form submit
$(document).on("submit", "#support_form", function(e) {
	e.preventDefault();
	if (!validateForm('support_form')) return false; 
    $.ajax({
		url: base_url+'home/user_support',
        dataType: 'json',
        type: 'POST',
        data: new FormData(this),
        processData: false,
        contentType: false,
        success: function(data) {
				$('.ctrlVal').val('');
				$('.ctrlVal').html('');
				alert('Thank you. We will touch you soon!"!');
        },
        error: function() {}
    });
});

//Home JS
 function onloadCallback() {
            if ( $('#g-recaptcha').length ) {
                grecaptcha.render('g-recaptcha', {'sitekey' : 'past_your_site_key'});
            }
            if ( $('#g-recaptcha-2').length ) {
                grecaptcha.render('g-recaptcha-2', {'sitekey' : 'past_your_site_key'});
            }
        } 
  var CaptchaCallback = function() {
    jQuery('.g-recaptcha').each(function(index, el) {
        grecaptcha.render(el, {
            'sitekey' : jQuery(el).attr('data-sitekey')
            ,'theme' : jQuery(el).attr('data-theme')
            ,'size' : jQuery(el).attr('data-size')
            ,'tabindex' : jQuery(el).attr('data-tabindex')
            ,'callback' : jQuery(el).attr('data-callback')
            ,'expired-callback' : jQuery(el).attr('data-expired-callback')
            ,'error-callback' : jQuery(el).attr('data-error-callback')
        });
    });
  }; 
$(".g-recaptcha").each(function() {
    var object = $(this);
    grecaptcha.render(object.attr("id"), {
        "sitekey" : "6LdwRC0UAAAAAK0hjA8O4y1tViGPk9ypXEH_LU22",
        "callback" : function(token) {
            object.parents('form').find(".g-recaptcha-response").val(token);
            object.parents('form').submit();
        }
    });
}); 
    


function letsconnect() {

    var username = $('#contact-form-main').find("input[name='username']").val();
    var email = $('#contact-form-main').find("input[name='email']").val();
    var phone = $('#contact-form-main').find("input[name='phone']").val();
    var center = $('#contact-form-main').find("select[name='center']").val();
    var course = $('#contact-form-main').find("select[name='course']").val();
    var time = $('#contact-form-main').find("input[name='time']").val();
    var note = $('#contact-form-main').find("textarea[name='note']").val();
    var capp = $('#contact-form-main').find("#usercaptcha").val();
    var captchaword = $('#contact-form-main').find('#captchaword').val();
    var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;

    if (username.trim() == '') {
        $('#contact-form-main').find('#nameerror').html('Please enter your name');
        return false;
    } else {
        $('#contact-form-main').find('#nameerror').html('');
    }
    if (!filter.test(email)) {
        $('#contact-form-main').find('#emailerror').html('Please enter your valid email');
        return false;
    } else {
        $('#contact-form-main').find('#emailerror').html('');
    }
    if (phone.trim() == '' || phone.length != '10') {
        $('#contact-form-main').find('#phoneerror').html('Please enter your 10 digits phone no.');
        return false;
    } else {
        $('#contact-form-main').find('#phoneerror').html('');
    }
    if (center.trim() == '') {
        $('#contact-form-main').find('#centererror').html('Please enter your center');

        return false;
    } else {
        $('#contact-form-main').find('#centererror').html('');
    }
    if (course.trim() == '') {
        $('#contact-form-main').find('#courseerror').html('Please enter your course');
        return false;
    } else {
        $('#contact-form-main').find('#courseerror').html('');
    }
    if (time.trim() == '') {
        $('#contact-form-main').find('#timeerror').html('Please enter your time');
        return false;
    } else {
        $('#contact-form-main').find('#timeerror').html('');
    }
    if (note.trim() == '') {
        $('#contact-form-main').find('#noteerror').html('Please enter your note');
        return false;
    } else {
        $('#contact-form-main').find('#noteerror').html('');
    }
     if (capp.trim() == '') {
        $('#contact-form-main').find('#captchaerror').html('Please enter captcha code!');
        return false;
    } else {
        $('#contact-form-main').find('#captchaerror').html('');
    }
    if (capp.trim() == '' || capp.length != '4') {
        $('#contact-form-main').find('#captchaerror').html('Invalid captcha please enter valid captcha code!');
        return false;
    } else {
        $('#contact-form-main').find('#captchaerror').html('');
    }
    if(capp.trim() == '' || capp != captchaword){
        $('#contact-form-main').find('#captchaerror').html('Invalid captcha please enter correct captcha code!');
        return false;
    } else {
        $('#contact-form-main').find('#captchaerror').html('');
    }

    $.ajax({
        url: "<?php echo base_url();?>careers/letsconnect",
        type: 'POST',
        data: {
            'username': username,
            'email': email,
            'phone': phone,
            'center': center,
            'course': course,
            'time': time,
            'note': note,
            'capp': capp,
            'captchaword': captchaword,
        },
        success: function(results) {

            if (results.errors) {
                $('#carrer_msg').html(results);

            } else {
                if(results==1){
                    window.location = "<?= base_url() ?>thankyou";
                }else{
                    $('#carrer_msg').html(results);
                }
            }    
        }
    });
}

function setevent(id) {
    $('#evid').val(id);
}

function requestbook() {
    $("#bookoverview").modal('show');
 }

function submiteventquery() {
    var evfullname = $('#evfullname').val();
    console.log('evfullname', evfullname);
    var evmobileno = $('#evmobileno').val();
    console.log('evmobileno', evmobileno);
    var evemailid = $('#evemailid').val();
    console.log('evemailid', evemailid);
    var evclass = $('#evclass').val();
    console.log('evclass', evclass);
    var evid = $('#evid').val();
    console.log('evid', evid);
    if (evfullname.trim() == '') {
        $('#evfullnameerror').html('Please enter your name');
        return false;
    } else {
        $('#evfullnameerror').html('');
    }
    if (evmobileno.trim() == '') {
        $('#evmobilenoerror').html('Please enter your Mobile No');
        return false;
    } else {
        $('#evmobilenoerror').html('');
    }
    if (evemailid.trim() == '') {
        $('#evemailiderror').html('Please enter your Email ID');
        return false;
    } else {
        $('#evemailiderror').html('');
    }
    if (evclass.trim() == '') {
        $('#evclasserror').html('Please enter your Email ID');
        return false;
    } else {
        $('#evclasserror').html('');
    }
    $.ajax({
        url: "<?php echo base_url();?>careers/postEvent",
        type: 'POST',
        data: {
            'evfullname': evfullname,
            'evemailid': evemailid,
            'evmobileno': evmobileno,
            'evclass': evclass,
            'evid': evid
        },
        success: function(results) {

            if (results.errors) {
                $('#carrer_msg').html(results);

            } else {
                $('#carrer_msg').html(results);
                //window.location = "<?php echo base_url();"thankyou"?>";
                window.location = "<?= base_url() ?>thankyou";
            }

        }
    });
}

function addcommentsform() {

    var username = $('#contact-form-main-1').find("input[name='username']").val();
    var email = $('#contact-form-main-1').find("input[name='email']").val(); 
    var phone = $('#contact-form-main-1').find("input[name='phone']").val();
    var center = $('#contact-form-main-1').find("select[name='center']").val();
    var course = $('#contact-form-main-1').find("select[name='course']").val();
    var time = $('#contact-form-main-1').find("input[name='time']").val();
    var note = $('#contact-form-main-1').find("textarea[name='note']").val();
    // var capp = $('#contact-form-main-1').find("#g-recaptcha-response").val();
    var capp = $('#contact-form-main-1').find("#bookcaptcha").val();
    var bookcapp = $('#contact-form-main-1').find("#bookcodeword").val();
    var a = $('#contact-form-main-1').find("#email").val();
    var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;


    if (username.trim() == '') {
        $('#contact-form-main-1').find('#nameerror').html('Please enter your name');
        return false;
    } else {
        $('#contact-form-main-1').find('#nameerror').html('');
    }
    if (!filter.test(email)) {
        $('#contact-form-main-1').find('#emailerror').html('Please enter your valid email');
        return false;
    } else {
        $('#contact-form-main-1').find('#emailerror').html('');
    }
    if (phone.trim() == '' || phone.length != '10') {
        $('#contact-form-main-1').find('#phoneerror').html('Please enter your 10 digits phone no.');
        return false;
    } else {
        $('#contact-form-main-1').find('#phoneerror').html('');
    }
    if (center.trim() == '') {
        $('#contact-form-main-1').find('#centererror').html('Please enter your center');

        return false;
    } else {
        $('#contact-form-main-1').find('#centererror').html('');
    }
    if (course.trim() == '') {
        $('#contact-form-main-1').find('#courseerror').html('Please enter your course');
        return false;
    } else {
        $('#contact-form-main-1').find('#courseerror').html('');
    }
    if (time.trim() == '') {
        $('#contact-form-main-1').find('#timeerror').html('Please enter your time');
        return false;
    } else {
        $('#contact-form-main-1').find('#timeerror').html('');
    }
    if (note.trim() == '') {
        $('#contact-form-main-1').find('#noteerror').html('Please enter your note');
        return false;
    } else {
        $('#contact-form-main-1').find('#noteerror').html('');
    }
    if (capp.trim() == '') {
        $('#contact-form-main-1').find('#bookcapperror').html('Please enter captcha code!');
        return false;
    } else {
        $('#contact-form-main-1').find('#bookcapperror').html('');
    }
    if (capp.trim() == '' || capp.length != '4') {
        $('#contact-form-main-1').find('#bookcapperror').html('Invalid captcha Please enter valid captcha code!');
        return false;
    } else {
        $('#contact-form-main-1').find('#bookcapperror').html('');
    }
    if (capp.trim() == '' || capp != bookcapp) {
        $('#contact-form-main-1').find('#bookcapperror').html('Invalid captcha Please enter correct captcha code!');
        return false;
    } else {
        $('#contact-form-main-1').find('#bookcapperror').html('');
    }

    $.ajax({
        url: "<?php echo base_url();?>careers/postCourse",
        type: 'POST',
        data: {
            'username': username,
            'email': email,
            'phone': phone,
            'center': center,
            'course': course,
            'time': time,
            'note': note,
            'capp': capp,
            'bookcapp': bookcapp,
        },
        success: function(results) {
        if (results.errors) {
            $('#carrer_msg').html(results);
        } else {
            if(results==1){
                window.location = "<?= base_url() ?>thankyou";
            }else{
                $('#carrer_msg').html(results);
            }
        }

        }
    });
}
function enquiryformsubmit() {

    var username = $('#contact-form-main-2').find("input[name='username']").val();
    var email = $('#contact-form-main-2').find("input[name='email']").val();
    var phone = $('#contact-form-main-2').find("input[name='phone']").val();
    var center = $('#contact-form-main-2').find("select[name='center']").val();
    var course = $('#contact-form-main-2').find("select[name='course']").val();
    var time = $('#contact-form-main-2').find("input[name='time']").val();
    var note = $('#contact-form-main-2').find("textarea[name='note']").val();
    // var capp = $('#contact-form-main-1').find("#g-recaptcha-response").val();
    var capp = $('#contact-form-main-2').find("#captcha").val();
    var word = $('#contact-form-main-2').find('#codeword').val();
    var a = $('#contact-form-main-2').find("#email").val();
    var filter = /^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+[a-zA-Z0-9_-]+@[a-zA-Z0-9]+[a-zA-Z0-9.-]+[a-zA-Z0-9]+.[a-z]{2,4}$/;

    if (username.trim() == '') {
        $('#contact-form-main-2').find('#nameerror').html('Please enter your name');
        return false;
    } else {
        $('#contact-form-main-2').find('#nameerror').html('');
    }
    if (!filter.test(email)) {
        $('#contact-form-main-2').find('#emailerror').html('Please enter your valid email');
        return false;
    } else {
        $('#contact-form-main-2').find('#emailerror').html('');
    }
    if (phone.trim() == '' || phone.length != '10') {
        $('#contact-form-main-2').find('#phoneerror').html('Please enter your 10 digits phone no.');
        return false;
    } else {
        $('#contact-form-main-2').find('#phoneerror').html('');
    }
    if (center.trim() == '') {
        $('#contact-form-main-2').find('#centererror').html('Please enter your center');

        return false;
    } else {
        $('#contact-form-main-2').find('#centererror').html('');
    }
    if (course.trim() == '') {
        $('#contact-form-main-2').find('#courseerror').html('Please enter your course');
        return false;
    } else {
        $('#contact-form-main-2').find('#courseerror').html('');
    }
    if (time.trim() == '') {
        $('#contact-form-main-2').find('#timeerror').html('Please enter your time');
        return false;
    } else {
        $('#contact-form-main-2').find('#timeerror').html('');
    }
    if (note.trim() == '') {
        $('#contact-form-main-2').find('#noteerror').html('Please enter your note');
        return false;
    } else {
        $('#contact-form-main-2').find('#noteerror').html('');
    }
    if (capp.trim() == '') {
        $('#contact-form-main-2').find('#capperror').html('Please enter catpcha code!');
        return false;
    } else {
        $('#contact-form-main-2').find('#capperror').html('');
    }
    if (capp.trim() == '' || capp.length != '4') {
        $('#contact-form-main-2').find('#capperror').html('Invalid captcha Please enter valid captcha code!');
        return false;
    } else {
        $('#contact-form-main-2').find('#capperror').html('');
    }
    if (capp.trim() == '' || capp != word) {
        $('#contact-form-main-2').find('#capperror').html('Invalid captcha Please enter correct captcha code!');
        return false;
    } else {
        $('#contact-form-main-2').find('#capperror').html('');
    }

    $.ajax({
        url: "<?php echo base_url();?>careers/enquieryformsubmit",
        type: 'POST',
        data: {
            'username': username,
            'email': email,
            'phone': phone,
            'center': center,
            'course': course,
            'time': time,
            'note': note,
            'capp': capp,
            'word': word,
        },
        success: function(results) {

            if (results.errors) {
                $('#carrer_msg').html(results);

            } else {
                if(results==1){
                    window.location = "<?= base_url() ?>thankyou";
                }else{
                    $('#carrer_msg').html(results);
                }
            }

        }
    });
}
var base_url = "<?= base_url() ?>";

function filterobtabsasd(id) {
    //$('#exam-item-'+id).attr('class','Active');
    $.ajax({
        url: "<?php echo base_url();?>home/gettestimonial",
        type: 'POST',
        data: {
            'exam_id': id
        },
        success: function(results) {
            data = JSON.parse(results);
            let html = '';
            // html +='<div class="testimonial-carousel owl-carousel owl-theme default-nav owl-loaded owl-drag">'
            $.each(data, function(key, value) {
                html += "<div class='owl-item cloned' style='width: 356.667px;'><div class='testimonial-block' style='position: relative;padding: 5px; width: 356.667px; '>\
                                    <div class='inner-box' >\
                                        <div class='text-box'>\
                                            " + value.fld_testimonial_content + "\
                                        </div>\
                                        <div class='info-box' style='position: relative;min-height: 100px;padding-left: 75px;padding-top: 0;'>\
                                            <div class='thumb'><img src='" + base_url + "testimonial_images/" + value
                    .fld_img + "' alt=''></div>\
                                            <h5 class='name'>" + value.fld_name + "</h5>\
                                            <span class='designation'>Student</span>\
                                        </div>\
                                    </div>\
                                </div></div>";
            });
            // html += "</div>";

            $(".testimonial_div").find('.owl-stage').html("");
            $(".testimonial_div").find('.owl-stage').html(html);
            //  if(results.errors)
            // {
            //    $('#carrer_msg').html(results);

            // }
            // else
            // { 
            //   $('#carrer_msg').html(results);
            //   //window.location = "<?php echo base_url();"thankyou"?>";
            //   window.location = "https://www.successmantra.in/thankyou";
            // }

        }
    });
}
$("#phone").keydown(function(event) {
    k = event.which;
    if ((k >= 96 && k <= 105) || (k >= 48 && k <= 57) || k == 8 || k == 9 || k == 37 || k == 39 || k == 46) {
        if ($(this).val().length == 10) {
            if (k == 8 || k == 9 || k == 37 || k == 39 || k == 46) {
                return true;
            } else {
                event.preventDefault();
                return false;
            }
        }
    } else {

        event.preventDefault();
        return false;
    }
}); 
    $(document).ready(function() {
    var showChar = 1500; 
    var ellipsestext = "";
    var moretext = "Read  More";
    var lesstext = "Read Less";
    

    $('.moredata').each(function() {
        var content = $(this).html();
 
        if(content.length > showChar) {
 
            var c = content.substr(0, showChar);
            var h = content.substr(showChar, content.length - showChar);
 
            var html = c + '<span class="moreellipses">' + ellipsestext+ '&nbsp;</span><span class="morecontent"><span>' + h + '</span>&nbsp;&nbsp;<a href="" class="morelink">' + moretext + '</a></span>';
 
            $(this).html(html);
        }
 
    });
 
    $(".morelink").click(function(){
        if($(this).hasClass("less")) {
            $(this).removeClass("less");
            $(this).html(moretext);
        } else {
            $(this).addClass("less");
            $(this).html(lesstext);
        }
        $(this).parent().prev().toggle();
        $(this).prev().toggle();
        return false;
    });
}); 
    
    // Scroll to a Specific Div
    if ($('.scroll-to-target').length) {
        $(".scroll-to-target").on('click', function() {
            var target = $(this).attr('data-target');
            // animate
            $('html, body').animate({
                scrollTop: $(target).offset().top
            }, 1000);

        });
    } 
    $(document).ready(function(){
        $(".overview-readbtn").click(function(){
            $(".morecontent").hide();
            $(".morecontentbutton").hide();
            $(".fullcontent").show();
            $(".fullcontentbutton").show();
        });
        $(".overview-readbtn-readless").click(function(){
            $(".morecontent").show();
            $(".morecontentbutton").show();
            $(".fullcontent").hide();
            $(".fullcontentbutton").hide();
        });
     
        $(".testimonial-readbtn").click(function(){
            $(".moretestimonial").hide();
            $(".moretestimonialbutton").hide();
            $(".fulltestimonial").show();
            $(".fulltestimonialbutton").show();
        });
        $(".testimonial-readless").click(function(){
            $(".moretestimonial").show();
            $(".moretestimonialbutton").show();
            $(".fulltestimonial").hide();
            $(".fulltestimonialbutton").hide();
        });
    }); 

    