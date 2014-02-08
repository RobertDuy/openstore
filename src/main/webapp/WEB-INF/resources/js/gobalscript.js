var currentUser = function(userId, username, firstname, lastname, address,
		birthdate, avatar, loginStatus, phoneNumber) {
	this.userId = userId;
	this.username = username;
	this.firstname = firstname;
	this.lastname = lastname;
	this.address = address;
	this.birthdate = birthdate;
	this.avatar = avatar;
	this.loginStatus = loginStatus;
	this.phoneNumber = phoneNumber;
}

var tnode = function(id, name, isin, sex, relative, level, numbers, FID, MID,
		HWID, birthdate, diedate, avatar, tooltip, information) {
	this.id = id;
	this.name = name;
	this.isin = isin;
	this.sex = sex;
	this.relative = relative;
	this.level = level; // level is begin with 0 of root
	this.numbers = numbers; // numbers of an object with their brother
	this.FID = FID;
	this.MID = MID;
	this.HWID = HWID;
	this.birthdate = birthdate;
	this.diedate = diedate;
	this.avatar = avatar;
	this.tooltip = tooltip;
	this.information = information;
	this.group = null; // number, all children + child relative is an group
	// of an object with isin = 0;
	this.numOfGroup = 1;// number nodes in this group
	this.numInGroup = null; // numbers in this group
	this.x = null;
	this.y = null;
	this.color = null;
	this.isEnd = true; // if this node hasn't children, mean TRUE// for
	// virtual node!
	this.isVirtual = false;
	this.isAdded = false;
	this.isExpand = false;
	this.text = '-';
	this.marked = false;
}
var rel = function(hid, wid) {
	this.hid = hid;
	this.wid = wid;
}

var Node = function(id, FID, MID, sex, isin, relative, level, numbers,
		phoneNumber, avatar, dieDate, firstname, middlename, lastname,
		homeLand, address, birthDate, carrer, information, userManage) {
	this.id = id;
	this.FID = FID;
	this.MID = MID;
	this.sex = sex;
	this.isin = isin;
	this.relative = relative;
	this.level = level;
	this.phoneNumber = phoneNumber;
	this.numbers = numbers;
	this.avatar = avatar;
	this.dieDate = dieDate;
	this.firstname = firstname;
	this.middlename = middlename;
	this.lastname = lastname;
	this.homeLand = homeLand;
	this.address = address;
	this.birthDate = birthDate;
	this.carrer = carrer;
	this.information = information;
	this.userManage = userManage;
}

var listCurrentNode = new Array();
var userlogin;

function initNode(id, FID, MID, sex, isin, relative, level, numbers,
		phoneNumber, avatar, dieDate, firstname, middlename, lastname,
		homeLand, address, birthDate, carrer, information, userManage) {
	var node = new Node(id, FID, MID, sex, isin, relative, level, numbers,
			phoneNumber, avatar, dieDate, firstname, middlename, lastname,
			homeLand, address, birthDate, carrer, information, userManage);
	return node;

}

function initUser(userId, username, firstname, lastname, address, birthdate,
		avatar, loginStatus, phoneNumber) {
	return new currentUser(userId, username, firstname, lastname, address,
			birthdate, avatar, loginStatus, phoneNumber);
}

var relative = function(hid, wid) {
	this.hid = hid;
	this.wid = wid;
}
var listCurrentRelative = new Array();

function initRelative(hid, wid) {
	var rel = new relative(hid, wid);
	return rel;
}

function bindTooltip(user) {
	alert(user.username);
}

function loginSubmit() {
	var username = $('#username').val().trim();
	var password = $('#password').val().trim();
	$.ajax({
		url : "/login/submit",
		type : "POST",
		data : {
			username : username,
			password : password
		},
		success : function(data, textStatus, jqXHR) {
			if (data.error = false) {
				$('#mainDivBody').html("");
				$('#mainDivBody').html(data.strResult);
			} else if (data.error) {
				alert(data.strResult);
			}
		},
		error : function(jqXHR, textStatus, errorThrown) {
		}
	});
}

function signUpCreateAccount() {
	var isError = false;
	if ($('#username').val().trim() == '') {
		alert("Please input username");
		isError = true;
	} else if ($('#email').val().trim() == '') {
		alert("Please input email");
		isError = true;
	} else if ($('#password').val().trim() == '') {
		alert("Please type password");
		isError = true;
	} else if ($('#confirm_pass').val().trim() == '') {
		alert("Please retype password");
		isError = true;
	} else if ($('#password').val().trim() != $('#confirm_pass').val().trim()) {
		alert("Your password & confrim password miss match. Please retype password");
		isError = true;
	} else if ($('#firstname').val().trim() == '') {
		alert("Please input first name");
		isError = true;
	} else if ($('#lastname').val().trim() == '') {
		alert("Please input last name");
		isError = true;
	} else if ($('#birthdate').val().trim() == '') {
		alert("Please choose your birthdate");
		isError = true;
	}
	if (!isError) {
		var options = {
			beforeSend : function() {

			},
			uploadProgress : function(event, position, total, percentComplete) {
				// trong qua trinh uploading
			},
			success : function() {

			},
			complete : function(response) {
				var text = response.responseText;
				if (text.substring(0, 4) == 'Your') {
					alert(text);
					setTimeout(function() {
						window.location = '/' + $('#username').val().trim()
								+ '/welcome';
					}, 500);
				} else {
					alert(text);
				}
			}
		};
		$('#signupForm').ajaxForm(options);
		$('#signupForm').submit();
	}
}

function updateAccount() {
	var isError = false;
	if ($('#email').val().trim() == '') {
		alert("Please input email");
		isError = true;
	} else if ($('#password').val().trim() == '') {
		alert("Please type password");
		isError = true;
	} else if ($('#confirm_pass').val().trim() == '') {
		alert("Please retype password");
		isError = true;
	} else if ($('#password').val().trim() != $('#confirm_pass').val().trim()) {
		alert("Your password & confrim password miss match. Please retype password");
		isError = true;
	} else if ($('#firstname').val().trim() == '') {
		alert("Please input first name");
		isError = true;
	} else if ($('#lastname').val().trim() == '') {
		alert("Please input last name");
		isError = true;
	} else if ($('#birthdate').val().trim() == '') {
		alert("Please choose your birthdate");
		isError = true;
	}
	if (!isError) {
		var options = {
			beforeSend : function() {

			},
			uploadProgress : function(event, position, total, percentComplete) {
				// trong qua trinh uploading
			},
			success : function() {

			},
			complete : function(response) {
				var text = response.responseText;
				if (text.substring(0, 4) == 'Your') {
					alert(text);
					setTimeout(function() {
						window.location = '/' + $('#username').val().trim()
								+ '/welcome';
					}, 500);
				} else {
					alert(text);
				}
			}
		};
		$('#userUpdateInfoForm').ajaxForm(options);
		$('#userUpdateInfoForm').submit();
	}
}

function recoveryPass() {
	var isError = false;
	if ($('#recoveryEmail').val().trim() == '') {
		alert("Please input your email");
		isError = true;
	}
	if (!isError) {
		var options = {
			beforeSend : function() {

			},
			uploadProgress : function(event, position, total, percentComplete) {
				// trong qua trinh uploading
			},
			success : function() {

			},
			complete : function(response) {
				var text = response.responseText;
				if (text.substring(0, 2) == 'An') {
					alert(text);
					setTimeout(function() {
						window.location = '/';
					}, 500);
				} else {
					alert(text);
				}
			}
		};
		$('#recoverypassform').ajaxForm(options);
		$('#recoverypassform').submit();
	}
}

function addNodeSubmit() {
	var isError = false;
	if ($('#nodename').val().trim() == '') {
		alert("Please input nodename");
		isError = true;
	} else if ($('#birthdate').val().trim() == '') {
		alert("Please input birthdate, follow yyyy/mm/dd");
		isError = true;
	}
	if (!isError) {
		var options = {
			beforeSend : function() {

			},
			uploadProgress : function(event, position, total, percentComplete) {
				// trong qua trinh uploading
			},
			success : function() {

			},
			complete : function(response) {
				var text = response.responseText;
				alert(text);
			}
		};
		$('#addNodeForm').ajaxForm(options);
		$('#addNodeForm').submit();
	}
}

function relativeFormSubmit() {
	var isError = false;
	if ($('#husbandname').val().trim() == '') {
		alert("Please input husband name");
		isError = true;
	} else if ($('#wifename').val().trim() == '') {
		alert("Please input wife name");
		isError = true;
	} else if ($('#marriedDate').val().trim() == '') {
		alert("Please input married Date, follow yyyy/mm/dd");
		isError = true;
	}
	if (!isError) {
		var options = {
			beforeSend : function() {

			},
			uploadProgress : function(event, position, total, percentComplete) {
				// trong qua trinh uploading
			},
			success : function() {

			},
			complete : function(response) {
				var text = response.responseText;
				alert(text);
			}
		};
		$('#addRelativeForm').ajaxForm(options);
		$('#addRelativeForm').submit();
	}
}
function getNewsView(username) {
	$.ajax({
		url : '/' + username + '/news',
		type : "GET",
		data : {},
		success : function(data, textStatus, jqXHR) {
			$('#main-content').html('')
			$('#main-content').html(data).show();
		},
		error : function(jqXHR, textStatus, errorThrown) {
		}
	});
}

function bindClickBehavior(username, isAdmin) {
	$('#linfo')
			.bind(
					'click',
					function() {
						$('#lnews').removeClass('current');
						$(this).addClass('current');
						$('#levent').removeClass('current');
						$('#laddnode').removeClass('current');
						$('#lnodeedit').removeClass('current');
						$('#laddlative').removeClass('current');
						$('#lgenealogic').removeClass('current');
						$
								.ajax({
									url : '/json/info/' + isAdmin,
									type : "GET",
									data : {},
									success : function(data, textStatus, jqXHR) {
										$('#main-content').html('');
										$('#main-content')
												.append(
														"<div id=\"gp_content\" style=\"margin:10px;\"></div>");
										$('#gp_content').html(data);
										if (isAdmin == "true") {
											$('#main-content')
													.append(
															"<div class=\"addNodeView\"><button class=\"button2\" onclick=\"updateInfo();\">Edit Info</button></div>");
										}
									},
									error : function(jqXHR, textStatus,
											errorThrown) {
									}
								});
					});
	$('#lgenealogic').bind('click', function() {
		$('#lnews').removeClass('current');
		$(this).addClass('current');
		$('#laddnode').removeClass('current');
		$('#lnodeedit').removeClass('current');
		$('#laddlative').removeClass('current');
		$('#levent').removeClass('current');
		$('#linfo').removeClass('current');
		$.ajax({
			url : '/json/' + username,
			type : "GET",
			data : {},
			success : function(data, textStatus, jqXHR) {
				window.close();
			},
			error : function(jqXHR, textStatus, errorThrown) {
			}
		});
	});
	$('#laddnode').bind('click', function() {
		$('#lnews').removeClass('current');
		$('#lgenealogic').removeClass('current');
		$(this).addClass('current');
		$('#lnodeedit').removeClass('current');
		$('#laddlative').removeClass('current');
		$('#linfo').removeClass('current');
		$('#levent').removeClass('current');
		$.ajax({
			url : '/node/addnode',
			type : "GET",
			data : {},
			success : function(data, textStatus, jqXHR) {
				$('#main-content').html('')
				$('#main-content').html(data).show();
			},
			error : function(jqXHR, textStatus, errorThrown) {
			}
		});
	});
	$('#lnodeedit').bind('click', function() {
		$('#lnews').removeClass('current');
		$('#lgenealogic').removeClass('current');
		$(this).addClass('current');
		$('#laddnode').removeClass('current');
		$('#laddlative').removeClass('current');
		$('#linfo').removeClass('current');
		$('#levent').removeClass('current');
		$.ajax({
			url : '/node/edit',
			type : "GET",
			data : {},
			success : function(data, textStatus, jqXHR) {
				$('#main-content').html('')
				$('#main-content').html(data).show();
			},
			error : function(jqXHR, textStatus, errorThrown) {
			}
		});
	});
	$('#laddlative').bind('click', function() {
		$('#lnews').removeClass('current');
		$('#lgenealogic').removeClass('current');
		$(this).addClass('current');
		$('#laddnode').removeClass('current');
		$('#lnodeedit').removeClass('current');
		$('#linfo').removeClass('current');
		$('#levent').removeClass('current');
		$.ajax({
			url : '/node/relativesetting',
			type : "GET",
			data : {},
			success : function(data, textStatus, jqXHR) {
				$('#main-content').html('')
				$('#main-content').html(data).show();
			},
			error : function(jqXHR, textStatus, errorThrown) {
			}
		});
	});
	$('#levent').bind('click', function() {
		$('#lnews').removeClass('current');
		$('#lgenealogic').removeClass('current');
		$(this).addClass('current');
		$('#laddnode').removeClass('current');
		$('#lnodeedit').removeClass('current');
		$('#linfo').removeClass('current');
		$('#laddlative').removeClass('current');
		$.ajax({
			url : '/events',
			type : "GET",
			data : {},
			success : function(data, textStatus, jqXHR) {
				$('#main-content').html('')
				$('#main-content').html(data).show();
			},
			error : function(jqXHR, textStatus, errorThrown) {
			}
		});
	});
	$('#perheaderid').bind('mouseover', function() {
		$(this).addClass("selected");
		$('#sub').show();
	});
	$('#main-content').bind('mouseover', function() {
		$('#perheaderid').removeClass("selected");
		$('#sub').hide();
	});

}

function tooltip(input) {
	$("#mystickytooltip").empty();
	var s;
	for ( var i = 0; i < input.length; i++) {
		s = generateString(i, input[i].name, input[i].avatar,
				input[i].birthdate, input[i].level, input[i].information,
				input[i].sex);
		$("#mystickytooltip").append(s);
		$('#' + input[i].id).attr("data-tooltip", "div-tt" + i);
		stickytooltip.init2("*[data-tooltip]", "mystickytooltip");
	}
};
function generateString(i, name, avatar, birthdate, level, content, sex) {
	if (avatar == "") {
		if (sex == "1")
			avatar = "guess.png";
		else
			avatar = "guess_female.png";
	}
	if (!content) {
		content = "There no information!";
	}
	if (content.length > 200) {
		content = content.substr(0, 190) + "...";
	}
	level++;
	return '<div id="div-tt'
			+ i
			+ '" class="atip" align="top" ><table width = "250" align= "left">	<tr align="left">		<td width = "60">			<img width = "80" height = "80" src="http://localhost:8080/resources/img/node/'
			+ avatar
			+ '"/>		</td>		<td align="left">			<table align="left"width = "170">				<tr align ="left">					<td width ="50" align = "left">Name					</td>					<td>'
			+ name
			+ '					</td>				</tr>				<tr align = "left">					<td width = "50">BirthDate					</td>					<td>'
			+ birthdate
			+ '					</td>									</tr>				<tr align = "left">					<td width = "50">Level					</td>					<td>'
			+ level
			+ '					</td>		</tr>	</table>	</td></tr>	<tr>	<td colspan="3" text-align="justify"><hr/>'
			+ content + '		</td>			</tr></table></div>';

};

function nodeClick(node) {
	$.ajax({
		url : '/node/' + node.id,
		type : "GET",
		data : {},
		success : function(data, textStatus, jqXHR) {
			$('#main-content').html('')
			$('#main-content').html(data).show();
		},
		error : function(jqXHR, textStatus, errorThrown) {
		}
	});
}

function changePasswordForm() {
	var isError = false;
	if ($('#oldPass').val().trim() == '') {
		alert("Please input old password");
		isError = true;
	} else if ($('#newPass').val().trim() == '') {
		alert("Please input new password");
		isError = true;
	} else if ($('#reNewPass').val().trim() == '') {
		alert("Please retype your new password");
		isError = true;
	} else if ($('#reNewPass').val().trim() != $('#newPass').val().trim()) {
		alert("Your new password & retype password is not match! please retype");
		$('#reNewPass').focus();
		isError = true;
	}
	if (!isError) {
		var options = {
			beforeSend : function() {

			},
			uploadProgress : function(event, position, total, percentComplete) {
				// trong qua trinh uploading
			},
			success : function() {

			},
			complete : function(response) {
				var text = response.responseText;
				alert(text);
				setTimeout(function() {
					window.location = '/' + $('#username').val().trim()
							+ '/welcome';
				}, 500);

			}
		};
		$('#changePasswordForm').ajaxForm(options);
		$('#changePasswordForm').submit();
	}
}
function nodeEditLoadWindow() {
	var selected = $('#node_dg').datagrid().datagrid('getSelected');
	if (selected == null) {
		alert('Please select row to edit');
		return;
	}
	$.ajax({
		url : '/node/update/' + selected.id,
		type : "GET",
		data : {},
		success : function(data, textStatus, jqXHR) {
			$('#main-content').html('')
			$('#main-content').html(data).show();
		},
		error : function(jqXHR, textStatus, errorThrown) {
		}
	});
}
function updateNodeSubmit() {
	var isError = false;
	if ($('#nodename').val().trim() == '') {
		alert("Please input nodename");
		isError = true;
	} else if ($('#birthdate').val().trim() == '') {
		alert("Please input birthdate, follow yyyy/mm/dd");
		isError = true;
	}
	if (!isError) {
		var options = {
			beforeSend : function() {

			},
			uploadProgress : function(event, position, total, percentComplete) {
				// trong qua trinh uploading
			},
			success : function() {

			},
			complete : function(response) {
				var text = response.responseText;
				alert(text);
				$('#lnodeedit').click();
			}
		};
		$('#peopleUpdateForm').ajaxForm(options);
		$('#peopleUpdateForm').submit();
	}
}
function deleteNode() {
	var selected = $('#node_dg').datagrid().datagrid('getSelected');
	if (selected == null) {
		alert('Please select row to delete');
		return;
	}
	$.ajax({
		url : '/node/remove/' + selected.id,
		type : "GET",
		data : {},
		success : function(data, textStatus, jqXHR) {
			alert(data);
			$('#lnodeedit').click();
		},
		error : function(jqXHR, textStatus, errorThrown) {
		}
	});
}

function deleteRelative() {
	var selected = $('#relative_dg').datagrid().datagrid('getSelected');
	if (selected == null) {
		alert('Please select row to delete');
		return;
	}
	$.ajax({
		url : '/relative/remove/',
		type : "POST",
		data : {
			hId : selected.hId,
			wId : selected.wId
		},
		success : function(data, textStatus, jqXHR) {
			alert(data);
			$('#lnodeedit').click();
		},
		error : function(jqXHR, textStatus, errorThrown) {
		}
	});
}

function updateInfo() {
	var data = $('#gp_content').html();
	$('#main-content')
			.html(
					'<textarea id="editor" rows="10" name="editor1" cols="80" style="visibility: hidden; display: none;"></textarea><div class="addNodeView"><button class=\"button2\" onclick=\"return saveGPInfo();\">Save</button></div>')
	$('#editor').val(data);
	$('#editor').ckeditor();
	setTimeout(function() {
		$(".cke_contents.cke_reset").css('height', '500');
	}, 150);
}

function saveGPInfo() {
	$.ajax({
		url : '/gpInfo/save',
		type : "POST",
		data : {
			content : $('#editor').val()
		},
		success : function(data, textStatus, jqXHR) {
			alert('Update successfully.');
		},
		error : function(jqXHR, textStatus, errorThrown) {
		}
	});
}

function readEvent(eventID, titleDiv, contentDiv, dateCreate, userCreate) {
	var contentData = $('#' + contentDiv).val();
	var titleData = $('#' + titleDiv).val();
	$('#main-content').html('');

	$('#main-content')
			.append(
					"<div style=\"height:20px; margin:10px;\"><a class=\"srow_title\" title=\"+titleData+\" target=\"_blank\" style=\"font-size:20px; font-weight:bold;\">"
							+ titleData + "</a></div>");
	$('#main-content').append(
			"<div id=\"eventDiv\" style=\"margin:10px;\"></div>");
	$('#main-content').append(
			"<textarea style=\"display:none;\" id=" + titleDiv + ">"
					+ titleData + "</textarea>");
	$('#eventDiv').html(contentData);
	$('#main-content').append(
			'<div class="addNodeView"><button class=\"button2\" onclick=\"editEvent('
					+ eventID + ',\'' + titleDiv + '\')\">Edit</button></div>')
}
function editEvent(eventId, titleDiv) {
	var data = $('#eventDiv').html();
	var titleData = $('#' + titleDiv).val();
	$('#main-content').html('');
	$('#main-content')
			.append(
					"<div style=\"height:20px; margin:10px;\"><input id=\"titleEdit\"></div>");
	$('#titleEdit').val(titleData);
	$('#main-content').append(
			"<input type=\"hidden\" id=\"eventId\" value=" + eventId + " >");
	$('#main-content')
			.append(
					'<textarea id="editor" rows="10" name="editor1" cols="80" style="visibility: hidden; display: none;"></textarea><div class="addNodeView"><button class=\"button2\" onclick=\"saveEvent();\">Save</button></div>')
	$('#editor').val(data);
	$('#editor').ckeditor();
	setTimeout(function() {
		$(".cke_contents.cke_reset").css('height', '500');
	}, 200);
}

function saveEvent() {
	$.ajax({
		url : '/event/save',
		type : "POST",
		data : {
			eventId : $('#eventId').val(),
			content : $('#editor').val(),
			title : $('#titleEdit').val()
		},
		success : function(data, textStatus, jqXHR) {
			alert(data);
		},
		error : function(jqXHR, textStatus, errorThrown) {
		}
	});
}

function createEvent() {
	$('#main-content').html('');
	$('#main-content')
			.append(
					'<textarea id="editor" rows="10" name="editor1" cols="80" style="visibility: hidden; display: none;"></textarea><div class="addNodeView"><button class=\"button2\" onclick=\"saveEvent();\">Save</button></div>');
	$('#editor').ckeditor();
	setTimeout(function() {
		$(".cke_contents.cke_reset").css('height', '500');
	}, 200);
}

function deleteEvent(eventId) {
	$.ajax({
		url : '/event/delete',
		type : "POST",
		data : {
			eventId : eventId
		},
		success : function(data, textStatus, jqXHR) {
			$('#levent').click();
		},
		error : function(jqXHR, textStatus, errorThrown) {
		}
	});
}

var oneNodeArray;

function showNode() {
	var nodeInput = document.getElementById("nodeSearch").value;

	// pre-process input data to id
	var inputID = "";
	var index11 = nodeInput.indexOf(":") + 1;
	var index12 = nodeInput.indexOf(")") - 1;
	for ( var i = index11; i <= index12; i++) {
		inputID += nodeInput.charAt(i);
	}
	nodeInput = inputID;
	var a = 0;
	var b = 0;
	var thisLevel = 0;
	for ( var i = 0; i < arrLevelSorted.length; i++) {
		for ( var j = 0; j < arrLevelSorted[i].length; j++) {
			if (arrLevelSorted[i][j].id == nodeInput) {
				a = i;
				b = j;
			}
		}
	}
	thisLevel = arrLevelSorted[a][b].level;
	oneNodeArray = new Array();
	oneNodeArray[0] = new Array();
	// oneNodeArray[0].push(arrLevelSorted[a][b]);
	if (!arrLevelSorted[a][b].HWID) {
		oneNodeArray[0].push(arrLevelSorted[a][b]);
	} else {
		for ( var k = 0; k < arrLevelSorted[a].length; k++) {
			if (arrLevelSorted[a][k].id == arrLevelSorted[a][b].HWID) {
				oneNodeArray[0].push(arrLevelSorted[a][k]);
			}
		}
	}
	for ( var k = 0; k < arrLevelSorted[a].length; k++) {
		if (arrLevelSorted[a][k].HWID == oneNodeArray[0][0].id) {
			oneNodeArray[0].push(arrLevelSorted[a][k]);
		}
	}

	for ( var i = a + 1; i < arrLevelSorted.length; i++) {

		for ( var j = 0; j < arrLevelSorted[i].length; j++) {
			if (checkInArray(oneNodeArray, arrLevelSorted[i][j].FID)
					|| checkInArray(oneNodeArray, arrLevelSorted[i][j].MID)
					|| checkInArray(oneNodeArray, arrLevelSorted[i][j].HWID)) {
				if (!oneNodeArray[i - a]) {
					oneNodeArray[i - a] = new Array();
				}
				oneNodeArray[i - a].push(arrLevelSorted[i][j]);

			}

		}
	}
	
	for ( var i = 0; i < oneNodeArray.length; i++) {
		for ( var j = 0; j < oneNodeArray[i].length; j++) {
		
			oneNodeArray[i][j].level -= thisLevel;
			
		}
	}
	var arrLevelSorted_temp = jQuery.extend(true, {}, arrLevelSorted);
	arrLevelSorted = oneNodeArray;
	arrLevelSorted[0][0].FID = null;
	arrLevelSorted[0][0].MID = null;
	arrLevelSorted[0][0].HWID = null;
	var lv = arrLevelSorted[arrLevelSorted.length - 1][0].level;

	$("#canvas").empty();
	// begin calculate coordinate
	width1 = scaleX(arrLevelSorted);
	height1 = scaleY(2);

	setXY1(arrLevelSorted, width1, height1);
	g = new Graph();
	if (lv == 0) {
		addGraph(arrLevelSorted, g, 1, 1);
	} else {
		addGraph(arrLevelSorted, g, 2, 1);
	}
	
	layouter = new Graph.Layout.Spring(g);
	renderer = new Graph.Renderer.Raphael('canvas', g, width1, height1);

	layouter.layout();
	renderer.draw();
	tooltip(input);
//	arrLevelSorted = jQuery.extend(true, {}, arrLevelSorted_temp);
}
function checkInArray(arr, element) {
	for ( var i = 0; i < arr.length; i++) {
		for ( var j = 0; j < arr[i].length; j++) {
			if (arr[i][j].id == element) {
				return 1;
			}
		}
	}
	return 0;
}

function loadEditInfo(id){
	$.ajax({
		url : '/node/update2/' + id,
		type : "GET",
		data : {},
		success : function(data, textStatus, jqXHR) {
			$('#main-content').html('')
			$('#main-content').html(data).show();
		},
		error : function(jqXHR, textStatus, errorThrown) {
		}
	});
}