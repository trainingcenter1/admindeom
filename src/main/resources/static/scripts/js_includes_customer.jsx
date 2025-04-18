/*! RESOURCE: /scripts/js_includes_customer.js */
/*! RESOURCE: ScrumReleaseImportGroupDialog */
var ScrumReleaseImportGroupDialog = Class.create();
ScrumReleaseImportGroupDialog.prototype = {
   initialize: function () {
      this.setUpFacade();
   },
   
   setUpFacade: function () {
      var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
      this._mstrDlg = new dialogClass("task_window");
      this._mstrDlg.setTitle(getMessage("Add Members From Group"));
      this._mstrDlg.setBody(this.getMarkUp(), false, false);
   },
   setUpEvents: function () {
      var self = this, dialog = this._mstrDlg;
      var okButton = $("ok");
      if (okButton) {
         okButton.on("click", function () {
         var mapData = {};
         if (self.fillDataMap (mapData)) {
            var processor = new GlideAjax("ScrumAjaxAddReleaseTeamMembersProcessor");
            for (var strKey in mapData) {
               processor.addParam(strKey, mapData[strKey]);
            }
            self.showStatus(getMessage("Adding group users..."));
            processor.getXML(function () {
               self.refresh();
               dialog.destroy();
            });
         } else {
            dialog.destroy();
         }
      });
      }
      var cancelButton = $("cancel");
      if (cancelButton) {
      cancelButton.on("click", function () {
         dialog.destroy();
      });
      }
      var okNGButton = $("okNG");
      if (okNGButton) {
      okNGButton.on("click", function () {
         dialog.destroy();
      });
      }
      var cancelNGButton = $("cancelNG");
      if (cancelNGButton) {
      cancelNGButton.on("click", function () {
         dialog.destroy();
      });
      }
   },
   refresh: function(){
      GlideList2.get("scrum_pp_team.scrum_pp_release_team_member.team").refresh();
   },
   getScrumReleaseTeamSysId: function () {
      return g_form.getUniqueValue() + "";
   },
   getUserChosenGroupSysIds: function () {
      return $F('groupId') + ""; 
   },
   showStatus: function (strMessage) {
      $("task_controls").update(strMessage);
   },
   
   display: function(bIsVisible) {
      $("task_window").style.visibility = (bIsVisible ? "visible" : "hidden");
   },
  getRoleIds: function () {
      var arrRoleNames = ["scrum_user", "scrum_admin", "scrum_release_planner", "scrum_sprint_planner", "scrum_story_creator"];
      var arrRoleIds = [];
      var record = new GlideRecord ("sys_user_role");
      record.addQuery ("name", "IN", arrRoleNames.join (","));
      record.query ();
      while (record.next ())
         arrRoleIds.push (record.sys_id + "");
      return arrRoleIds;
  },
  hasScrumRole: function (roleSysId, arrScrumRoleSysIds) {
     for (var index = 0; index < arrScrumRoleSysIds.length; ++index)
        if (arrScrumRoleSysIds[index] == "" + roleSysId)
           return true;
  
     var record = new GlideRecord ("sys_user_role_contains");
     record.addQuery("role", roleSysId);
     record.query ();
     while (record.next())
       if (this.hasScrumRole (record.contains, arrScrumRoleSysIds))
         return true;
     return false;
  },
  getGroupIds: function () {  
     var arrScrumRoleIds = this.getRoleIds ();
     var arrGroupIds = [];
     var record = new GlideRecord ("sys_group_has_role");
     record.query ();
     while (record.next ())
        if (this.hasScrumRole (record.role, arrScrumRoleIds))
           arrGroupIds.push (record.group + "");
     return arrGroupIds;
   },
   
   getGroupInfo: function () {
      var mapGroupInfo = {};
      var arrRoleIds = this.getRoleIds ();
      var arrGroupIds = this.getGroupIds (arrRoleIds);
      var record = new GlideRecord ("sys_user_group");
      record.addQuery("sys_id", "IN", arrGroupIds.join (","));
      record.query ();
      while (record.next ()) {
         var strName = record.name + "";
         var strSysId = record.sys_id + "";
         mapGroupInfo [strName] = {name: strName, sysid: strSysId};
      }
      return mapGroupInfo;
   },
   getMarkUp: function () {
      var groupAjax = new GlideAjax('ScrumUserGroupsAjax');
      groupAjax.addParam('sysparm_name', 'getGroupInfo');
      groupAjax.getXML(this.generateMarkUp.bind(this));
   },
   generateMarkUp: function(response) {
      var mapGroupInfo = {};
      var groupData = response.responseXML.getElementsByTagName("group");
	   var strName, strSysId;
      for (var i = 0; i < groupData.length; i++) {
        strName = groupData[i].getAttribute("name");
        strSysId = groupData[i].getAttribute("sysid");
        mapGroupInfo[strName] = {
          name: strName,
          sysid: strSysId
        };
      }
      var arrGroupNames = [];
      for (var strGroupName in mapGroupInfo) {
        arrGroupNames.push (strGroupName + "");
      }
      arrGroupNames.sort ();
      var strMarkUp = "";
      if (arrGroupNames.length > 0) {
         var strTable = "<div class='row'><div class='form-group'><span class='col-sm-12'><select class='form-control' id='groupId'>";
         for (var nSlot = 0; nSlot < arrGroupNames.length; ++nSlot) {
            strName = arrGroupNames[nSlot];
            strSysId = mapGroupInfo [strName].sysid;
strTable += "<option value='" + strSysId + "'>" + strName + "</option>";
         }
strTable += "</select></span></div></div>";
      
      strMarkUp = "<div id='task_controls'>" + strTable + 
                    "<div style='text-align:right;padding-top:20px;'>" +
"<button id='cancel' class='btn btn-default' type='button'>" + getMessage("Cancel") + "</button>"+
"&nbsp;&nbsp;<button id='ok' class='btn btn-primary' type='button'>" + getMessage("OK") + "</button>" +
"</div></div>";
      } else {
strMarkUp = "<div id='task_controls'><p>No groups with scrum_user role found</p>" +
                        "<div style='text-align: right;padding-top:20px;'>" +
"<button id='cancelNG' class='btn btn-default' type='button'>" + getMessage("Cancel") + "</button>"+
"&nbsp;&nbsp;<button id='okNG' class='btn btn-primary' type='button'>" + getMessage("OK") + "</button>" +
"</div></div>";
      }
      this._mstrDlg.setBody(strMarkUp, false, false);
      this.setUpEvents();
      this.display(true);
   },
   fillDataMap: function (mapData) {
      var strChosenGroupSysId = this.getUserChosenGroupSysIds ();
      if (strChosenGroupSysId) {
         mapData.sysparm_name = "createReleaseTeamMembers";
         mapData.sysparm_sys_id = this.getScrumReleaseTeamSysId ();
         mapData.sysparm_groups = strChosenGroupSysId;
         return true;
      } else {
         return false;
      }
   }
};
/*! RESOURCE: ConnectionUtils */
var ConnectionUtils = {
	getSysConnection: function() {
		var connGR = new GlideRecord("sys_connection");
		connGR.addQuery('active', true);
		connGR.addQuery("connection_alias", g_form.getValue("connection_alias"));
		connGR.addQuery("sys_domain", g_form.getValue("sys_domain"));
		connGR.addQuery("sys_id", "!=", g_form.getUniqueValue());
		connGR.query();
	
		return connGR;
	},
	doConnection: function(verb) {
		if (g_form.getValue("active") == "false") {
			gsftSubmit(null, g_form.getFormElement(), verb);
		}
		var connGR;
		var performOverride = function() {
			connGR.active = false;
			connGR.update();
			gsftSubmit(null, g_form.getFormElement(), verb);
		};
		
		var grConnAlias = new GlideRecord("sys_alias");
		if (grConnAlias.get(g_form.getValue("connection_alias"))) {
			if (grConnAlias.multiple_connections == 'true') {
				gsftSubmit(null, g_form.getFormElement(), verb);
			} else {
				connGR = this.getSysConnection();
				if (connGR.next()) {
					var currName = g_form.getValue("name");
					if (connGR.name.toUpperCase() == currName.toUpperCase()) {
						var uniqueErrMsg = new GwtMessage().getMessage("A connection with {0} name already exists, duplicate connection names are not allowed", currName);
						g_form.addErrorMessage(uniqueErrMsg);
						return false;
					}
					var title = new GwtMessage().getMessage("Confirm inactivation");
var question = new GwtMessage().getMessage("You already have a {0} connection active, {1}.<br/>By making this one active, {2} will become inactive. <br/>Are you sure you want to make {3} the active connection?", connGR.protocol, connGR.name, connGR.name, currName);
					this.confirmOverride(title, question, performOverride);
				} else {
					gsftSubmit(null, g_form.getFormElement(), verb);
				}
			}
		}
	},
	confirmOverride: function(title, question, onPromptComplete) {
		var dialogClass = (window.GlideModal) ? GlideModal : GlideDialogWindow;
		var dialog = new GlideDialogWindow('glide_confirm_basic');
		dialog.setTitle(title);
		dialog.setSize(400, 325);
		dialog.setPreference('title', question);
		dialog.setPreference('onPromptComplete', onPromptComplete);
		dialog.render();
	},
	
};
/*! RESOURCE: RiskRankCalculatorUtil */
var RiskRankCalculatorUtil = Class.create();
RiskRankCalculatorUtil.prototype = {
    initialize: function(g_form) {
        this.g_form = g_form;
    },
    setRiskRank: function() {
        var ajax = new GlideAjax('AjaxRiskUtil');
        ajax.addParam("sysparm_impact", g_form.getValue('impact'));
        ajax.addParam("sysparm_probability", g_form.getValue('probability'));
        ajax.addParam("sysparm_name", 'getRiskRankDetails');
		ajax.addParam("sysparm_risk_id", g_form.getUniqueValue());
        ajax.getXML(function(response) {
            var result = response.responseXML.getElementsByTagName("result");
            result = result[0];
            g_form.setValue('risk_rank', result.getAttribute('rank'));
			g_form.setValue('risk_value', result.getAttribute('value'));
			g_form.getControl('risk_rank').setStyle('background-color:'+ result.getAttribute('color')) ;
        });
    },
    type: 'RiskRankCalculatorUtil'
};
/*! RESOURCE: PpmIntGroupSprintCreationHandler */
var PpmIntGroupSprintCreationHandler = Class.create({
    initialize: function (gr) {
        this._gr = gr;
		this._isList = (gr.type+""=="GlideList2")||(gr.type+""=="GlideList3");
        this._sysId = this._isList ? this._gr.getChecked() : this._gr.getUniqueValue();
        this._tableName = this._gr.getTableName();
        this._prmErr = [];
    },
	
    showLoadingDialog: function() {
        this.loadingDialog = new GlideDialogWindow("dialog_loading", true, 300);
        this.loadingDialog.setPreference('table', 'loading');
        this.loadingDialog.render();
    },
    hideLoadingDialog: function() {
        this.loadingDialog && this.loadingDialog.destroy();
    },
    showDialog: function () {
		if(this._tableName=='m2m_release_group')
			this.getGroupFromReleaseGroup(this._sysId);
		else
			this.getDefaultDataAndShowDialog();
    },
	
	getDefaultDataAndShowDialog: function(){
		if(!(this._sysId == '')){
(new GlideUI()).clearOutputMessages();
            this.showLoadingDialog();
            this._getDefaultData();
		}else{
            var span = document.createElement('span');
            span.setAttribute('data-type', 'system');
            span.setAttribute('data-text', getMessage('Please select a Group'));
            span.setAttribute('data-duration', '4000');
            span.setAttribute('data-attr-type', 'error');
            var notification  = {xml: span};
            GlideUI.get().fire(new GlideUINotification(notification));
		}
	},
	getGroupFromReleaseGroup: function(releaseGroupIds){
		var ga = new GlideAjax("agile2_AjaxProcessor");
		ga.addParam('sysparm_name', 'getGroupsFromReleaseGroups');
		ga.addParam('sysparm_releasegroups', releaseGroupIds);
        ga.getXML(this._groupCallback.bind(this));
	},
	
	_groupCallback: function (response) {
        var groups = response.responseXML.getElementsByTagName("group");
		var groupIds = '';
		var id;
		for(var i = 0; i < groups.length; i++) {
			id = groups[i].getAttribute("id");
			if(groupIds=='')
				groupIds = id;
			else
				groupIds = groupIds + ',' + id;
		}
		this._sysId = groupIds;
		this.getDefaultDataAndShowDialog();
    },
    showMainDialog: function() {
        this.hideLoadingDialog();
        var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
        this._mstrDlg = new dialogClass("ppm_int_TeamSprintCreationPage");
        var titleMsg = getMessage("Create Sprints");
        this._mstrDlg.setTitle(titleMsg);
        this._mstrDlg.setPreference('sprintCreationHandler', this);
        this._mstrDlg.setPreference('sysparm_nostack', true);
        this._mstrDlg.setPreference('sysparm_start_date', this._defaultStartDate);
        this._mstrDlg.setPreference('sysparm_count', this._defaultCount);
        this._mstrDlg.setPreference('sysparm_duration', this._defultDuration);
        this._mstrDlg.setPreference('sysparm_name', this.defaultName);
		this._mstrDlg.setPreference('focusTrap', true);
        this._mstrDlg.render();
    },
    onSubmit: function () {
        try {
            this.sprintCount = this._getValue('sprint_count');
            this.startDate = this._getValue('start_date');
            this.name = this._getValue('sprint_name');
            this.startAt = this._getValue('sprint_start_count');
            this.duration = this._getValue('sprint_duration');
            if (!this._validate()) {
                return false;
            }
            var ga = new GlideAjax("ppm_int_TeamProcessor");
            ga.addParam('sysparm_name', 'createSprints');
            ga.addParam('sysparm_start_date', this.startDate);
            ga.addParam('sysparm_sysid', this._sysId);
            ga.addParam('sysparm_count', this.sprintCount);
            ga.addParam('sysparm_start_count', this.startAt);
            ga.addParam('sysparm_sprint_name', this.name);
            ga.addParam('sysparm_duration', this.duration);
            this.showLoadingDialog();
            ga.getXML(this.callback.bind(this));
        } catch(err) {
            this._displayErrorDialog();
            console.log(err);
        }
        return false;
    },
    callback: function (response) {
        this.hideLoadingDialog();
        this._mstrDlg.destroy();
        var resp = response.responseXML.getElementsByTagName("result");
        if (resp[0] && resp[0].getAttribute("status") == "success") {
            window.location.reload();
        } else if (resp[0] && resp[0].getAttribute("status") == "hasOverlappingSprints") {
this._hasOverlappingSprints = true;
            if(this._isList)
                this._gr._refreshAjax();
        }else {
            this._displayErrorDialog();
        }
    },
    _displayErrorDialog: function() {
        var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
        this._createError = new dialogClass("ppm_int_error_dialog");
        this._createError.setTitle(getMessage("Error while creating Sprints for Team."));
        this._createError.render();
    },
    _validate: function () {
        this._prmErr = [];
		this.sprintCountLimit = 25;
        var field = '';
        this._removeAllError('ppm_int_TeamSprintCreationPage');
        if (this.name == 'undefined' || this.name.trim() == "") {
            this._prmErr.push(getMessage("Provide name"));
            field = 'sprint_name';
        }
        else if (!this.startAt || isNaN(this.startAt)) {
            this._prmErr.push(getMessage("Provide integer value"));
            field = 'sprint_start_count';
        }
        else if (this.startDate == 'undefined'
                 || this.startDate.trim() == ""
                 || getDateFromFormat(this.startDate, g_user_date_format) == 0) {
            this._prmErr.push(getMessage("Provide valid start date"));
            field = 'start_date';
        }
        else if (!this.duration || isNaN(this.duration)) {
            this._prmErr.push(getMessage("Provide integer value"));
            field = 'sprint_duration';
        }
        else if (!this.sprintCount || isNaN(this.sprintCount)) {
            this._prmErr.push(getMessage("Provide integer value"));
            field = 'sprint_count';
        }
		else if (this.sprintCount > this.sprintCountLimit) {
            this._prmErr.push(formatMessage(getMessage('The total number of sprints should not be more than {0}'), this.sprintCountLimit));
            field = 'sprint_count';
        }
        if (this._prmErr.length > 0) {
            setTimeout("var refocus = document.getElementById('" + field + "');refocus.focus();", 0);
            this._showFieldError(field, this._prmErr[0]);
            return false;
        }
        return true;
    },
    _getValue: function (inptNm) {
        return gel(inptNm).value;
    },
    _getDefaultData: function () {
        var ga = new GlideAjax("ppm_int_TeamProcessor");
        ga.addParam('sysparm_name', 'calculateSprintDefaults');
        ga.addParam('sysparm_sysid', this._sysId);
        ga.getXML(this._defaultDataCallback.bind(this));
    },
    _defaultDataCallback: function (response) {
        var resp = response.responseXML.getElementsByTagName("result");
        if (resp[0]) {
            this._defaultStartDate = resp[0].getAttribute("next_start_date");
            this._defaultCount = resp[0].getAttribute("count");
            this._defultDuration = resp[0].getAttribute("duration");
            this.defaultName = resp[0].getAttribute('name');
        }
        this.showMainDialog();
    },
    _showFieldError: function(groupId,message){
        var $group = $j('#'+groupId+'_group');
        var $helpBlock = $group.find('.help-block');
        if(!$group.hasClass('has-error'))
            $group.addClass('has-error');
        if($helpBlock.css('display')!="inline"){
            $helpBlock.text(message);
            $helpBlock.css('display','inline');
        }
    },
    _removeAllError: function(dialogName){
        $j('#'+dialogName+' .form-group.has-error').each(function(){
            $j(this).removeClass('has-error');
            $j(this).find('.help-block').css('display','none');
        });
    },
    
    type: "PpmIntGroupSprintCreationHandler"
});
/*! RESOURCE: PlannedTaskDateUtil */
var PlannedTaskDateUtil = Class.create();
PlannedTaskDateUtil.prototype = {
    initialize: function(g_form, g_scratchpad) {
        this.g_form = g_form;
        this.g_scratchpad = g_scratchpad;
        var tableName = g_form.getTableName();
        this.dayField = "ni." + tableName + ".durationdur_day";
        this.hourField = "ni." + tableName + ".durationdur_hour";
        this.minuteField = "ni." + tableName + ".durationdur_min";
        this.secondField = "ni." + tableName + ".durationdur_sec";
        this.tableName = tableName;
    },
	
    _showErrorMessage: function(column, message) {
		if (!message && !column) {
			try {
				this._gForm.showFieldMsg(column, message, 'error');
			} catch(e) {}
		}
    },
    setEndDate: function(answer) {
        this.g_scratchpad.flag = true;
        this.g_form.setValue('end_date', answer);
    },
    setDuration: function(answer) {
        this.g_scratchpad.flag = true;
        this.g_form.setValue('duration', answer);
    },
    getStartDate: function() {
        return this.g_form.getValue('start_date');
    },
    getDays: function() {
		var days = this.g_form.getValue(this.dayField);
        return this._getIntValue(days);
    },
    getHours: function() {
		var hours = this.g_form.getValue(this.hourField);
        return this._getIntValue(hours);
    },
    getMinutes: function() {
        var minutes = this.g_form.getValue(this.minuteField);
		return this._getIntValue(minutes);
    },
    getSeconds: function() {
        var seconds = this.g_form.getValue(this.secondField);
		return this._getIntValue(seconds);
    },
	_getIntValue: function(value) {
		var intValue = 0;
		if (value && !isNaN(value))
			intValue = parseInt(value);
		return intValue;
	},
    setDurationHoursAndDays: function() {
        var g_form = this.g_form;
        var days = this.getDays();
        var hours = this.getHours();
        var minutes = this.getMinutes();
        var seconds = this.getSeconds();
        this.g_scratchpad.flag = false;
        if (seconds >= 60) {
minutes += Math.floor(seconds / 60);
			seconds = seconds % 60;
        }
        if (minutes >= 60) {
hours += Math.floor(minutes / 60);
            minutes = minutes % 60;
        }
		if (hours >= 24) {
days += Math.floor(hours / 24);
			hours = hours % 24;
		}
        if (hours < 9)
            hours = "0" + hours;
        if (minutes < 9)
			minutes = "0" + minutes;
        if (seconds < 9)
			seconds = "0" + seconds;
        g_form.setValue(this.dayField, days);
        g_form.setValue(this.hourField, hours);
        g_form.setValue(this.minuteField, minutes);
        g_form.setValue(this.secondField, seconds);
    },
    validateDurationFields: function() {
        var g_form = this.g_form;
        var day = g_form.getValue(this.dayField);
        var hour = g_form.getValue(this.hourField);
        var minute = g_form.getValue(this.minuteField);
        var second = g_form.getValue(this.secondField);
        if (!day || day.trim() == '')
            g_form.setValue(this.dayField, "00");
        if (!hour || hour.trim() == '')
            g_form.setValue(this.hourField, "00");
        if (!minute || minute.trim() == '')
            g_form.setValue(this.minuteField, "00");
        if (!second || second.trim() == '')
            g_form.setValue(this.secondField, "00");
        var startDate = g_form.getValue("start_date");
        if (g_form.getValue("duration") == '')
            g_form.setValue("end_date", g_form.getValue("start_date"));
    },
    handleResponse: function(response, column) {
        if (response && response.responseXML) {
            var result = response.responseXML.getElementsByTagName("result");
            if (result) {
                result = result[0];
                var status = result.getAttribute("status");
                var answer = result.getAttribute("answer");
                if (status == 'error') {
                    var message = result.getAttribute('message');
                    this._showErrorMessage(result.getAttribute("column"), message);
                } else {
                    if (column == 'duration' || column == 'start_date')
                        this.setEndDate(answer);
                    else if (column == 'end_date')
                        this.setDuration(answer);
                }
            }
        }
    },
    calculateDateTime: function(column) {
        var self = this;
        var ga = new GlideAjax('AjaxPlannedTaskDateUtil');
        ga.addParam('sysparm_start_date', this.g_form.getValue('start_date'));
        if (column == 'duration' || column == 'start_date') {
            ga.addParam('sysparm_duration', this.g_form.getValue('duration'));
            ga.addParam('sysparm_name', 'getEndDate');
        } else if (column == 'end_date') {
            ga.addParam('sysparm_end_date', this.g_form.getValue('end_date'));
            ga.addParam('sysparm_name', 'getDuration');
        }
        ga.getXML(function(response) {
            self.handleResponse(response, column);
        });
    },
    calculateEndDateFromDuration: function(control, oldValue, newValue, isLoading, isTemplate) {
        var g_form = this.g_form;
        var g_scratchpad = this.g_scratchpad;
        this.validateDurationFields();
        if (isLoading || g_scratchpad.flag) {
            g_scratchpad.flag = false;
            return;
        }
        var startDate = this.getStartDate();
        var startDateEmpty = !startDate || startDate.trim() === '';
        if (newValue.indexOf("-") > -1 || startDateEmpty)
            return;
        
		this.setDurationHoursAndDays();
        this.calculateDateTime('duration');
    },
    calculateEndDateFromStartDate: function(control, oldValue, newValue, isLoading, isTemplate) {
        var g_form = this.g_form;
        var g_scratchpad = this.g_scratchpad;
        try {
            g_form.hideFieldMsg('start_date');
        } catch (e) {
        }
        if (isLoading || g_scratchpad.flag) {
            g_scratchpad.flag = false;
            return;
        }
        if (newValue == '')
            return;
        this.calculateDateTime('start_date');
    },
    calculateDurationFromEndDate: function(control, oldValue, newValue, isLoading, isTemplate) {
        var g_form = this.g_form;
        var g_scratchpad = this.g_scratchpad;
        var startDateColumn = 'start_date';
        var startDate;
        if (isLoading || g_scratchpad.flag) {
            g_scratchpad.flag = false;
            return;
        }
        startDate = g_form.getValue(startDateColumn);
        this.calculateDateTime('end_date');
    },
    type: "PlannedTaskDateUtil"
};
/*! RESOURCE: Validate Client Script Functions */
function validateFunctionDeclaration(fieldName, functionName) {
    var code = g_form.getValue(fieldName);
    if (code == "")
       return true;
    code = removeCommentsFromClientScript(code);
    var patternString = "function(\\s+)" + functionName + "((\\s+)|\\(|\\[\r\n])";
    var validatePattern = new RegExp(patternString);
    
    if (!validatePattern.test(code)) {
       var msg = new GwtMessage().getMessage('Missing function declaration for') + ' ' + functionName;
       g_form.showErrorBox(fieldName, msg);
       return false;
    }
    return true;
}
function validateNoServerObjectsInClientScript(fieldName) {
    var code = g_form.getValue(fieldName);
    if (code == "")
       return true;
    code = removeCommentsFromClientScript(code);
    
var doubleQuotePattern = /"[^"\r\n]*"/g;
    code = code.replace(doubleQuotePattern,""); 
var singleQuotePattern = /'[^'\r\n]*'/g;
    code = code.replace(singleQuotePattern,"");
    var rc = true;
var gsPattern = /(\s|\W)gs\./;
    if (gsPattern.test(code)) {
       var msg = new GwtMessage().getMessage('The object "gs" should not be used in client scripts.');
       g_form.showErrorBox(fieldName, msg);
       rc = false;
    }
var currentPattern = /(\s|\W)current\./;
    if (currentPattern.test(code)) {
       var msg = new GwtMessage().getMessage('The object "current" should not be used in client scripts.');
       g_form.showErrorBox(fieldName, msg);
       rc = false;
    }
    return rc;    
}
function validateUIScriptIIFEPattern(fieldName, scopeName, scriptName) {
	var code = g_form.getValue(fieldName);
	var rc = true;
	if("global" == scopeName)
		return rc;
	
	code = removeCommentsFromClientScript(code);
	code = removeSpacesFromClientScript(code);
	code = removeNewlinesFromClientScript(code);
	
	var requiredStart =  "var"+scopeName+"="+scopeName+"||{};"+scopeName+"."+scriptName+"=(function(){\"usestrict\";";
	var requiredEnd = "})();";
	
	if(!code.startsWith(requiredStart)) {
		var msg = new GwtMessage().getMessage("Missing closure assignment.");
		g_form.showErrorBox(fieldName,msg);
		rc = false;
	}
	
	if(!code.endsWith(requiredEnd)) {
		var msg = new GwtMessage().getMessage("Missing immediately-invoked function declaration end.");
		g_form.showErrorBox(fieldName,msg);
		rc = false;
	}
	return rc;
}
function validateNotCallingFunction (fieldName, functionName) {
	var code = g_form.getValue(fieldName);
	var rc = true;
	var reg = new RegExp(functionName, "g");
	var matches;
	
	code = removeCommentsFromClientScript(code);
	
	if (code == '')
		return rc;
	
	matches = code.match(reg);
	rc = (matches && (matches.length == 1));
	
	if(!rc) {
		var msg = "Do not explicitly call the " + functionName + " function in your business rule. It will be called automatically at execution time.";
		msg = new GwtMessage().getMessage(msg);
		g_form.showErrorBox(fieldName,msg);
	}
	
	return rc;
}
function removeCommentsFromClientScript(code) {
var pattern1 = /\/\*(.|[\r\n])*?\*\//g;
    code = code.replace(pattern1,""); 
var pattern2 = /\/\/.*/g;
    code = code.replace(pattern2,"");
    return code;
}
function removeSpacesFromClientScript(code) {
var pattern = /\s*/g;
	return code.replace(pattern,"");
}
function removeNewlinesFromClientScript(code) {
var pattern = /[\r\n]*/g;
	return code.replace(pattern,"");
}
/*! RESOURCE: ProjectTaskUtil */
var ProjectTaskUtil = Class.create();
ProjectTaskUtil.prototype = {
	initialize: function() {		
	},
	type: 'ProjectTaskUtil'
};
ProjectTaskUtil.decodeOnLoadActualDatesState = function(response) {
	var result = (response.responseXML.getElementsByTagName('result'))[0];
	var status = result.getAttribute('status');
	var workStartReadOnly = true;
	var workEndReadOnly = true;
	if(status == 'success') {
		var state = result.getAttribute('state');
		if(state == 'closed') {
			workStartReadOnly = false;
			workEndReadOnly = false;
		} else if(state == 'started')
			workStartReadOnly = false;
	}
	
	return {
		workStartReadOnly: workStartReadOnly,
		workEndReadOnly: workEndReadOnly
	};
};
ProjectTaskUtil.decodeOnChangeActualDatesState = function(response) {
	var result = (response.responseXML.getElementsByTagName('result'))[0];
	var state = JSON.parse(result.getAttribute('state'));
	return {
		workStartState: ProjectTaskUtil._decodeActualStartDateState(state.work_start_state),
		workEndState: ProjectTaskUtil._decodeActualEndDateState(state.work_end_state)
	};
};
ProjectTaskUtil._decodeActualStartDateState = function(result) {
	var workStartState = {
		date: '',
		readOnly: true
	};
	var status = result.work_start_status;
	if(status == 'success') {
		var state = result.work_start_state;
		if(state == 'already_started' || state == 'about_to_start') {
			workStartState.readOnly = false;
			workStartState.date = result.work_start;
		}
	}
	
	return workStartState;
};
ProjectTaskUtil._decodeActualEndDateState = function(result) {
	var workEndState = {
		date: '',
		readOnly: true
	};
	var status = result.work_end_status;
	if(status == 'success') {
		var state = result.work_end_state;
		if(state == 'already_closed' || state == 'about_to_close') {
			workEndState.readOnly = false;
			workEndState.date = result.work_end;
		}
	}
	
	return workEndState;
};
/*! RESOURCE: ScrumTaskDialog */
var ScrumTaskDialog = Class.create(GlideDialogWindow, {
    initialize: function () {
		if (typeof g_list != "undefined")
            this.list = g_list;
        else
            this.list = null;
        this.storyID = typeof rowSysId == 'undefined' ? (gel('sys_uniqueValue') ? gel('sys_uniqueValue').value : "") : rowSysId;
        this.setUpFacade();
        this.setUpEvents();
        this.display(true);
        this.checkOKButton();
        this.setWidth(155);
		this.focusFirstSelectElement();
    },
    toggleOKButton: function(visible){
        $("ok").style.display = (visible?"inline":"none");
    },
    setUpFacade: function () {
        GlideDialogWindow.prototype.initialize.call(this, "task_window", false);
        this.setTitle(getMessage("Add Scrum Tasks"));
        var mapCount = this.getTypeCounts();
        this.setBody(this.getMarkUp(mapCount), false, false);
    },
    checkOKButton: function(){
        var visible = false;
        var thisDialog = this;
        this.container.select("select").each(function(elem){
            if (elem.value + "" != "0")
                visible = true;
            if (!elem.onChangeAdded){
                elem.onChangeAdded = true;
                elem.on("change", function(){
                    thisDialog.checkOKButton();
                });
            }
        });
        this.toggleOKButton(visible);
    },
	
	focusFirstSelectElement: function() {
		this.container.select("select")[0].focus();
	},
    getTypeCounts: function() {
        var mapLabel = this.getLabels("rm_scrum_task", "type");
        var mapCount = {};
        for (var strKey in mapLabel) {
            mapCount[strKey] = getPreference("com.snc.sdlc.scrum.pp.tasks." + strKey, 0);
        }
        return mapCount;
    },
    setUpEvents: function () {
        var dialog = this;
        $("ok").on("click", function () {
            var mapTaskData = {};
            if (dialog.fillDataMap(mapTaskData)) {
                var taskProducer = new GlideAjax("ScrumAjaxTaskProducer");
                for (var strKey in mapTaskData) {
                    taskProducer.addParam("sysparm_" + strKey, mapTaskData[strKey]);
                }
                dialog.showStatus("Adding tasks...");
                taskProducer.getXML(function () {
                    dialog.refresh();
                    dialog._onCloseClicked();
                });
            } else {
                dialog._onCloseClicked();
            }
        });
        $("cancel").on("click", function () {
            dialog._onCloseClicked();
        });
    },
    refresh: function(){
        if (this.list)
            this.list.refresh();
        else
            this.reloadList("rm_story.rm_scrum_task.story");
    },
    getSysID: function(){
        return this.storyID;
    },
    fillDataMap: function (mapTaskData) {
        var bTasksRequired = false;
        mapTaskData.name = "createTasks";
        mapTaskData.sys_id = this.getSysID();
        var mapDetails = this.getLabels("rm_scrum_task", "type");
        var arrTaskTypes = [];
        for (var key in mapDetails) {
            arrTaskTypes.push(key);
        }
        for (var nSlot = 0; nSlot < arrTaskTypes.length; ++nSlot) {
            var strTaskType = arrTaskTypes[nSlot];
            var strTaskData = $(strTaskType).getValue();
            mapTaskData[strTaskType] = strTaskData;
            setPreference("com.snc.sdlc.scrum.pp.tasks." + strTaskType, strTaskData);
            if (strTaskData != "0") {
                bTasksRequired = true;
            }
        }
        return bTasksRequired;
    },
    getMarkUp: function (mapCounts) {
        function getSelectMarkUp(strFieldId, nValue) {
            var strMarkUp = "<select id='" + strFieldId + "'>";
            for (var nSlot = 0; nSlot <= 10; nSlot++) {
                if (nValue != 0 && nValue == nSlot) {
strMarkUp += "<option value='" + nSlot + "' + " + "selected='selected'" + ">" + nSlot + "</choice>";
                } else {
strMarkUp += "<option value='" + nSlot + "'>" + nSlot + "</choice>";
                }
            }
strMarkUp += "</select>";
            return strMarkUp;
        } 
        function buildRow(strMessage, strLabel, nValue) {
return "<tr><td><label for='" + strLabel + "'>" + strMessage + "</label></td><td>" + getSelectMarkUp(strLabel, nValue) +"</td></tr>";
        }
        function buildTable(mapDetails, mapCounts) {
            var arrDetails = [];
            for (var strKey in mapDetails) {
                arrDetails.push(strKey + "");
            }
            arrDetails.sort();
            var strBuf = "<table>";
            for (var index = 0; index < arrDetails.length; ++index) {
                var strTitleCase = arrDetails[index].charAt(0).toString().toUpperCase() + arrDetails[index].substring(1);
                var nCount = mapCounts[arrDetails[index]];
                strBuf += buildRow(strTitleCase, arrDetails[index], nCount);
            }
strBuf += "</table>";
            return strBuf;
        }
        var mapLabels = this.getLabels("rm_scrum_task", "type");
        return "<div id='task_controls'>" + buildTable(mapLabels, mapCounts) +
"<button id='ok' type='button'>" + getMessage('OK') + "</button>" +
"<button id='cancel' type='button'>" + getMessage('Cancel') + "</button></div>";
    },
    reloadForm: function () {
        document.location.href = document.location.href;
    },
    reloadList: function (strListName) {
        GlideList2.get(strListName).refresh();
    },
    showStatus: function (strMessage) {
        $("task_controls").update("Loading...");
    },
    display: function(bIsVisible) {
        $("task_window").style.visibility = (bIsVisible ? "visible" : "hidden");
    },
    getLabels: function(strTable, strAttribute) {
        var taskProducer = new GlideAjax("ScrumAjaxTaskProducer");
        taskProducer.addParam("sysparm_name" ,"getLabels");
        taskProducer.addParam("sysparm_table", strTable);
        taskProducer.addParam("sysparm_attribute", strAttribute);
        var result = taskProducer.getXMLWait();
        return this._parseResponse(result);
    },
    _parseResponse: function(resultXML) {
        var jsonStr = resultXML.documentElement.getAttribute("answer");
        var map = (isMSIE7 || isMSIE8) ? eval("(" + jsonStr + ")") : JSON.parse(jsonStr);
        return map;
    }
});
/*! RESOURCE: Go To Service Portal Button */
document.addEventListener("DOMContentLoaded", function(event) {
	var theWindow = getTopWindow().window.location;
	var theURL = theWindow.href;
	if (theURL.indexOf('nav_to.do?') != -1 || theURL.indexOf('navpage.do') != -1 || theURL == 'baseURL') {
		var theLinkElement = getTopWindow().document.querySelector("a[class~=headerlink]");
		if (jQuery(theLinkElement).length == 0) {
			var theStyle = "float: right; padding:0px;font-size: 1.3rem; margin: 5px 0px 0px 0px;" +
			"width: auto; height: 2px; text-align: center;" +
			"color: white";
			
			var linkDivOpen = '<div><span style="' + theStyle + '">';
var linkDivClose = "</span></div>";
			
			var essLink;
			var theHeaderElement;
			
			if(userHasRole('admin') == 'true'){
essLink = "<a target='_blank' href='/sp' id='essLink' class='headerlink' style='color: inherit;text-decoration: none;border: 2px solid white;border-radius: 3px;padding:8px;margin-right:10px'><span class='btn btn-icon icon-cart' style='font-size: 20px;' />Service Portal</a>";
				
				
				theHeaderElement = getTopWindow().document.querySelector(".navbar-header");
				jQuery(linkDivOpen + essLink + linkDivClose).insertAfter(theHeaderElement);
			}else if(userHasRole('Delta Users') == 'true'){
essLink = "<a target='_blank' href='/delta' id='essLink' class='headerlink' style='color: inherit;text-decoration: none;border: 2px solid white;border-radius: 3px;padding:8px;margin-right:10px'><span class='btn btn-icon icon-cart' style='font-size: 20px;' />Delta Portal</a>";
				
				
				theHeaderElement = getTopWindow().document.querySelector(".navbar-header");
				jQuery(linkDivOpen + essLink + linkDivClose).insertAfter(theHeaderElement);
				
			}else{
essLink = "<a target='_blank' href='/sp' id='essLink' class='headerlink' style='color: inherit;text-decoration: none;border: 2px solid white;border-radius: 3px;padding:8px;margin-right:10px'><span class='btn btn-icon icon-cart' style='font-size: 20px;' />Service Portal</a>";
				
				
				theHeaderElement = getTopWindow().document.querySelector(".navbar-header");
				jQuery(linkDivOpen + essLink + linkDivClose).insertAfter(theHeaderElement);
			}
		}
	}
});
function userHasRole(role){
	var ga = new GlideAjax('CheckUserRole');
	ga.addParam('sysparm_name','u_hasRole');
	ga.addParam('sysparm_role',role);
	ga.getXMLWait();
	return ga.getAnswer();
}
/*! RESOURCE: AssetSetDomainParameters */
function assetSetDomainParameters(gDialog) {
	var ga = new GlideAjax('global.AssetUtilsAJAX');
	ga.addParam('sysparm_name', 'isDomainDataSeparationEnabled');
	ga.getXMLWait();
	if (ga.getAnswer() === 'true') {
		gDialog.setPreference('sysparm_domain', g_form.getValue('sysparm_domain'));
		gDialog.setPreference('sysparm_domain_scope', g_form.getValue('sysparm_domain_scope'));
	}
}
/*! RESOURCE: snd_ui16_developer_patch */
if (!window.top.hasOwnProperty('snd_ui16_developer_patched')) {
  jslog('snd_ui16_developer_patch loading in top window.');
  (function (t) {
    function fail(jqxhr, settings, e) {
      if(jqxhr.readyState === 0){
         jslog('snd_ui16_developer_patch unable to load script.');
      } else {
         jslog('snd_ui16_developer_patch script loading error: ' + e.toString());
      }
    }
    var i;
    t.snd_ui16_developer_patched = null;
    i = setInterval(function () {
      var $ = t.jQuery;
      if (typeof $ == 'function') {
        clearInterval(i);
        $.when(
$.getScript('/snd_ui16_developer_patch_menus.jsdbx').fail(fail),
$.getScript('/snd_ui16_developer_patch.jsdbx').fail(fail),
            $.Deferred(function (deferred){
                $(deferred.resolve);
            })
        ).done(function(){
          t.snd_ui16_developer_patch();
        });
      }
    }, 500);
  })(window.top);
}
else if (window.top.snd_ui16_developer_patched != null) {
}
else if (window == window.top) {
  (function ($, window) {
    var config = {
      navigator: {
        width: parseInt("", 10) || 285,
      },
      navigator_context: {
        active: "true" == "true",
        hide_pencil: "false" == "true"
      },
      picker_width: {
        active: "true" == "true",
        max_width: parseInt("300", 10) || 300,
        min_width: parseInt("30", 10) || 60,
        load_timeout: parseInt("2000", 10) || 2000,
        max_search_width: parseInt("", 10) || 150
      },
      picker_icon: {
        active: "true" == "true",
        domain_table: "" || "domain"
      },
      profile_menu: {
        active: "false" == "true",
        check_impersonation: "false" == "true",
        link_preferences: "false" == "true"
      },
      dev_studio: {
        allow_multiple: "true" == "true"
      }
    };
    $.fn.snd_ui16dp_menu = (function () {
      var menus = {},
          loaded = false;
      function getMenuPosition($menu, mouse, direction, scrollDir) {
        var win = $(window)[direction](),
            scroll = $(window)[scrollDir](),
            menu = $menu[direction](),
            position = mouse + scroll;
        if (mouse + menu > win && menu < mouse) position -= menu;
        return position;
      }
      function closeAll() {
        for (var id in menus) {
          $(id).hide();
        }
      }
      return function (settings) {
        menus[settings.menu_id] = true;
        if (!loaded) {
          $(document).click(function () {
            closeAll();
          });
          $('iframe').on('load', function () {
             $(this).contents().on('click', function () {
                closeAll();
             });
          });
          loaded = true;
        }
        return this.each(function () {
          $(this).on(settings.event || 'click', settings.selector, function (e) {
            var $menu;
            closeAll();
            if (e.ctrlKey) return;
            $menu = $(settings.menu_id);
            $menu.data("invokedOn", $(e.target))
              .show()
              .css({
                  position: "absolute",
                  left: getMenuPosition($menu, e.clientX, 'width', 'scrollLeft'),
                  top: getMenuPosition($menu, e.clientY, 'height', 'scrollTop')
              })
              .off('click')
              .on('click', 'a', function (e) {
                  $menu.hide();
                  var $invokedOn = $menu.data("invokedOn");
                  var $selectedMenu = $(e.target);
                  settings.callback.call(this, $invokedOn, $selectedMenu);
              });
            return false;
          });
        });
      };
    })();
    function minVersion(letter) {
      var tag = 'glide-xanadu-07-02-2024__patch4b-01-15-2025';
var tag_word = tag.match(/glide-([^-]+)/);
      var tag_letter = tag_word ? tag_word[1].toString()[0].toUpperCase() : '';
      return letter <= tag_letter;
    }
    function addStyle(css) {
      $(document).ready(function() {
$('<style type="text/css">\n' + css + '\n</style>').appendTo(document.head);
      });
    }
    function isUI16() {
      if (!window.top.angular) return false;
      var a = window.top.angular.element('overviewhelp').attr('page-name');
      return a == 'ui16' || a == 'helsinki';
    }
    function createContextMenu(id, items) {
      var menu, item, i;
      menu = '<ul id="' + id + '" class="dropdown-menu" role="menu" ' +
             'style="display: none; z-index: 999;">';
      for (i = 0; i < items.length; i++) {
        item = items[i];
        if (item.role && !userHasRole(item.role)) {
          continue;
        }
        if (item.name === '-') {
menu += '<li class="divider"></li>';
        } else {
menu += '<li><a href="#" tabindex="-1">' + item.name + '</a></li>';
        }
      }
menu += '</ul>';
      $('body').append(menu);
    }
    function executeMenuItem(item, options) {
      var target = item.target,
          url = item.url,
          fn = item.fn;
      if (item.name == 'Refresh') {
        refreshPickers();
        return;
      }
      if (fn && typeof fn == 'function') {
        fn.call(window, options, config);
      }
      if (url) {
        if (typeof url == 'function') {
          url = url.call(window, options, config);
        }
        url += '';
        if (!url) {
          jslog('No URL to open.');
          return;
        }
        if (typeof target == 'function') {
          target = target.call(window, options, config);
        }
        if (!target || target == 'gsft_main') {
          openInFrame(url);
        } else {
          window.open(url, target);
        }
      }
    }
    function navigatorMenuPatch() {
      function callback(invokedOn, selectedMenu) {
        var module = invokedOn.closest('a'),
            id = module.attr('data-id'),
url = '/sys_app_module.do',
            text = selectedMenu.text();
        if (!id) {
          id = module.attr('id');
          if (post_helsinki) {
            if (!module.hasClass('app-node') && !module.hasClass('module-node')) {
              jslog('Not an app or module node.');
              return;
            }
          }
          if (!id) {
            jslog('No data id.');
            return;
          }
        }
        module.$id = id;
        var item, i;
        for (i = 0; i < items.length; i++) {
          item = items[i];
          if (item.name == text) {
            executeMenuItem(item, {
              module: module
            });
            return;
          }
        }
        jslog('Unknown item selected: "' + text + '"');
      }
      var items = snd_ui16_developer_patch_menus.navigator(),
          post_helsinki;
      if (!userHasRole('teamdev_configure_instance')) {
        return;
      }
      createContextMenu('snd_ui16dp_navigator_module_menu', items);
      post_helsinki = minVersion('I');
      $('#gsft_nav').snd_ui16dp_menu({
          event: 'contextmenu',
          selector: 'a[data-id],a[id]',
          menu_id: "#snd_ui16dp_navigator_module_menu",
          callback: callback
      });
      jslog('snd_ui16_developer_patch navigator patch applied');
    }
    function navigatorPencilPatch() {
      var post_helsinki = minVersion('I');
      if (post_helsinki) {
        addStyle(
          '#gsft_nav .sn-aside-btn.nav-edit-app,' +
          '#gsft_nav .sn-widget-list-action.nav-edit-module' +
          '{' +
            'display: none !important;' +
          '}'
        );
var width = config.navigator.width;
        if (width != 285) {
          $('.navpage-nav').width(width);
          $('#nav_west').width(width);
          $('.navpage-main').css('left', width + 'px');
        }
        jslog('snd_ui16_developer_patch navigator pencil patch applied.');
      }
    }
    function pickerWidthPatch(offset) {
      var max_w = config.picker_width.max_width,
          min_w = config.picker_width.min_width,
          pickers = $('.navpage-pickers .selector:has(select)'),
          nav_w,
          logo_w = 0,
          float_w,
          diff,
          size;
      if (!pickers.length) {
        jslog('snd_ui16_developer_patch picked width patch failed. No pickers found.');
        return;
      }
      $('.navpage-pickers').css('display', '');
pickers.css('width', '');
      nav_w = $('header.navpage-header').width();
if (minVersion('M')) {
        $('div.navbar-header').children().outerWidth(function (i, w) { logo_w += w; });
      } else {
        logo_w = $('div.navbar-header').outerWidth();
      }
      float_w = $('div.navbar-right').outerWidth();
      diff = nav_w - logo_w - float_w - (offset || 0);
size = 100 + (diff / pickers.length);
      size = size > max_w ? max_w : size;
      if (size < min_w) {
        $('.navpage-pickers').css('display', 'none');
        jslog('snd_ui16_developer_patch pickers hidden as less than minimum width (' + size + ' < ' + min_w + ')');
      } else {
        pickers.css('width', size);
        jslog('snd_ui16_developer_patch picker width patch applied (diff: ' + diff + '; size: ' + size + ')');
      }
    }
    function patchIcon(name, className, items, callback) {
      var id = 'snd_ui16dp_' + name + '_menu',
          post_istanbul = minVersion('J'),
          icon;
      createContextMenu(id, items);
      icon = $('.' + className + ' ' + (post_istanbul ? 'a.btn-icon' : 'span.label-icon'));
      if (icon.length) {
        icon.snd_ui16dp_menu({
          menu_id: "#" + id,
          callback: callback
        }).css('cursor', 'pointer');
        jslog('snd_ui16_developer_patch icon picker patch applied to ' + name + ' picker.');
      } else {
        jslog('snd_ui16_developer_patch icon picker patch unable to find ' + name + ' picker.');
      }
    }
    function patchUpdateSetPickerIcon() {
      function callback(invokedOn, selectedMenu) {
        var set_id = set_id = $('#update_set_picker_select').val(),
            text = selectedMenu.text(),
            item,
            i;
        for (i = 0; i < items.length; i++) {
          item = items[i];
          if (item.name == text) {
            executeMenuItem(item, {
              set_id: set_id
            });
            return;
          }
        }
        jslog('Unknown item selected: "' + text + '"');
      }
      var items = snd_ui16_developer_patch_menus.update_set();
      patchIcon('updateset', 'concourse-update-set-picker', items, callback);
    }
    function patchAppPickerIcon() {
      function getAppId() {
        var app_id = $('#application_picker_select').val();
return app_id.split(':').pop();
      }
      function callback(invokedOn, selectedMenu) {
        var app_id = getAppId(),
            text = selectedMenu.text(),
            item,
            i;
        for (i = 0; i < items.length; i++) {
          item = items[i];
          if (item.name == text) {
            executeMenuItem(item, {
              app_id: app_id
            });
            return;
          }
        }
        jslog('Unknown item selected: "' + text + '"');
      }
      var items = snd_ui16_developer_patch_menus.application();
      patchIcon('application', 'concourse-application-picker', items, callback);
    }
    function patchDomainPickerIcon() {
      function getDomainId() {
        var sys_id = $('#domain_picker_select').val();
        if (sys_id) {
sys_id = sys_id.split(':').pop();
        }
        return sys_id;
      }
      function callback(invokedOn, selectedMenu) {
        var domain_id = getDomainId(),
            text = selectedMenu.text(),
            item,
            i;
        for (i = 0; i < items.length; i++) {
          item = items[i];
          if (item.name == text) {
            executeMenuItem(item, {
              domain_table: domain_table,
              domain_id: domain_id
            });
            return;
          }
        }
        jslog('Unknown item selected: "' + text + '"');
      }
      var domain_table = config.picker_icon.domain_table;
      var items = snd_ui16_developer_patch_menus.domain();
      patchIcon('domain', 'concourse-domain-picker', items, callback);
    }
    function pickerIconPatch() {
      patchUpdateSetPickerIcon();
      patchAppPickerIcon();
      if (userHasRole('domain_admin')) {
        patchDomainPickerIcon();
      }
    }
    function profileMenuPatch() {
      var user_dropdown = $('#user_info_dropdown').next('ul'),
          impersonate_item;
      function addUnimpersonateItem() {
        impersonate_item.parent().after('<li><a href="snd_ui16dp_unimpersonate.do"' +
' target="gsft_main">Unimpersonate</a>');
        jslog('snd_ui16_developer_patch user menu patch applied.');
      }
      impersonate_item = user_dropdown.find('[sn-modal-show="impersonate"]');
      if (impersonate_item) {
        if (config.profile_menu.check_impersonation) {
          $.ajax({
url: '/snd_ui16dp.do?action=getImpersonationDetails',
            type: 'GET',
            dataType: 'JSON'
          }).done(function (data) {
            if (data.result && data.result.is_impersonating) {
              addUnimpersonateItem();
            } else {
              jslog('snd_ui16_developer_patch confirmed user is not impersonating.');
            }
          }).fail(function () {
            jslog('snd_ui16_developer_patch failed to check impersonation details.');
          });
        } else {
          addUnimpersonateItem();
        }
      }
      if (config.profile_menu.link_preferences && userHasRole()) {
        user_dropdown.children().first()
.after('<li><a href="/sys_user_preference_list.do?sysparm_query=user=' + top.NOW.user.userID + '" ' +
'target="gsft_main">Preferences</a></li>');
      }
    }
    function openInFrame(target) {
      jslog('snd_ui16_developer_patch opening target: ' + target);
      var frame = $('#gsft_main');
      if (frame.length) {
        frame[0].src = target;
      } else {
        jslog('> gsftMain frame not found.');
      }
    }
    function refreshPickers() {
      var injector = angular.element('body').injector();
      try {
        injector.get('snCustomEvent').fire('sn:refresh_update_set');
      } catch (e) {}
      try {
        injector.get('applicationService').getApplicationList();
      } catch (e) {}
      try {
        injector.get('domainService').getDomainList();
      } catch (e) {}
    }
    function userHasRole(role) {
      var roles = (',' + window.NOW.user.roles + ','),
          is_admin = roles.indexOf(',admin,') > -1;
      if (role) {
        return is_admin || roles.indexOf(',' + role + ',') > -1;
      }
      return is_admin;
    }
    function patch() {
      var nav_interval,
          picker_interval;
      if (config.navigator_context.active) {
        navigatorMenuPatch();
        if (config.navigator_context.hide_pencil) {
          navigatorPencilPatch();
        }
      }
      if (config.picker_width.active) {
        $('.navpage-pickers').removeClass('hidden-md');
        setTimeout(function () {
          pickerWidthPatch();
          picker_interval = setInterval(function () {
            pickerWidthPatch();
          }, 1000);
          setTimeout(function () {
            clearInterval(picker_interval);
          }, config.picker_width.load_timeout);
        }, config.picker_width.load_timeout);
        angular.element(window).on('resize', function () {
          pickerWidthPatch();
        });
        $('input#sysparm_search').focus(function () {
          pickerWidthPatch(config.picker_width.max_search_width);
        });
        $('input#sysparm_search').blur(function () {
          setTimeout(function () {
            pickerWidthPatch();
}, 500);
        });
      }
      if (config.picker_icon.active) {
        pickerIconPatch();
      }
      if (config.profile_menu.active) {
        profileMenuPatch();
      }
    }
    window.top.snd_ui16_developer_patch = function () {
      try {
        if (window.top.snd_ui16_developer_patched != null) {
          jslog('snd_ui16_developer_patch already applied.');
          return;
        }
        if (!isUI16()) {
          window.top.snd_ui16_developer_patched = false;
          jslog('snd_ui16_developer_patch ignored. Not UI16.');
        } else {
          jslog('Running snd_ui16_developer_patch...');
          patch();
          window.top.snd_ui16_developer_patched = true;
        }
      } catch (e) {
        jslog('[ws] UI16 Developer Patch mod failure: ' + e);
      }
    };
  })(jQuery, window);
}
/*! RESOURCE: NeedAssistance */
addLoadEvent(function(){
	try{
		if($('navpage_header_control_button') && g_user.hasRoles()){
			$('nav_header_stripe_decorations').style.width ="800px";
			
var selfserviceIcon = "<a href='nav_to.do?uri=com.glideapp.servicecatalog_cat_item_view.do%3Fv%3D1%26sysparm_id%3De3560c5e0fc0da001d466509b1050e8c' class='btn btn-default homepage-button' id='sneSelfServiceIcon' style='margin-left: 5px; margin-right: 8px; padding: 4px 4px 4px 4px; color:black;border-color: black;'>Need Assistance?</a>";
			$('gsft_logout').insert({before:selfserviceIcon});
		}
	}catch(e){}
});
/*! RESOURCE: tm_AssignDefect */
var tm_AssignDefect = Class.create({
	initialize: function (gr) {
		this._gr = gr;
		this._isList = (gr.type + "" == "GlideList2");
		this._sysId = this._gr.getUniqueValue();
		this._tableName = this._gr.getTableName();
		this._redirect = false;
		this._testCaseInstance = 'tm_test_case_instance';
		
		this._prmErr = [];
		if (this._tableName == 'tm_test_instance') {
			this._sysId = this._gr.getValue('tm_test_case_instance');
		}
		
		var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
		this._mstrDlg = new dialogClass("tm_ref_choose_dialog");
		var titleMsg = getMessage("Assign Defect to Test Case");
		this._mstrDlg.setTitle(titleMsg);
		this._mstrDlg.setPreference("sysparam_reference_table", "rm_defect");
		this._mstrDlg.setPreference("sysparam_query", "");
		
		this._mstrDlg.setPreference("sysparam_field_label", getMessage("Defect"));
		
		this._mstrDlg.setPreference("handler", this);
	},
	
	showLoadingDialog: function() {
		this.loadingDialog = new GlideDialogWindow("dialog_loading", true, 300);
		this.loadingDialog.setPreference('table', 'loading');
		this.loadingDialog.render();
	},
	
	hideLoadingDialog: function() {
		this.loadingDialog && this.loadingDialog.destroy();
	},
	
	showDialog: function () {
		this._mstrDlg.render();
	},
	
	onSubmit: function () {
		this.defectId = this._getValue('rm_defect_ref');
		this.defectLabel = this._getDisplayValue('rm_defect_ref');
		
		if (!this._validate()) {
			var e = gel("sys_display.rm_defect_ref");
			if (e)
				e.focus();	
			return false;
		}
		
		this._mstrDlg.destroy();
		
		if (this.defectId) {
			var ga = new GlideAjax("tm_AjaxProcessor");
			ga.addParam('sysparm_name', 'mapDefectToTestCase');
			ga.addParam('sysparm_sysId', this._sysId);
			ga.addParam('sysparm_defect', this.defectId);
			ga.addParam('sysparm_tn', this._testCaseInstance);
			
			this.showLoadingDialog();
			ga.getXML(this.callback.bind(this));
		}
		return false;
	},
	
	callback: function (response) {
		this.hideLoadingDialog();
		var resp = response.responseXML.getElementsByTagName("result");
		if (resp[0] && resp[0].getAttribute("status") == "success") {
			if (this._tableName == this._testCaseInstance) {
				var list = GlideList2.get(g_form.getTableName() + '.REL:5da20971872121003706db5eb2e3ec0b');
				if(list)
					list.setFilterAndRefresh('');
} else {
			this._displayInfoMessage(resp[0]);
		}
	} else {
		var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
		this._createError = new dialogClass("tm_error_dialog");
		this._createError.setTitle(getMessage("Error while assigning defect."));
		this._createError.render();
	}
},
_validate: function () {
	this._prmErr = [];
	this._removeAllError('tm_ref_choose_dialog');
	if (this._getValue('rm_defect_ref') == 'undefined' || this._getValue('rm_defect_ref').trim() == "") {
		this._prmErr.push(getMessage("Select the defect."));
		this._showFieldError('ref_test_suite_field', getMessage(this._prmErr[0]));
		return false;
	}
	return this._checkForDuplicateEntry();
},
_getValue: function (inptNm) {
	return gel(inptNm).value;
},
_getDisplayValue: function (inputNm) {
	return gel('display_hidden.' + inputNm).value;
},
_displayInfoMessage: function (result) {
	var infoMessage = result.textContent;
	this._gr.addInfoMessage(infoMessage);
},
_checkForDuplicateEntry: function () {
	this.defectId = this._getValue('rm_defect_ref');
	this._testCaseInstance;
	
	var ga = new GlideAjax("tm_AjaxProcessor");
	ga.addParam('sysparm_name', 'hasAssociation');
	ga.addParam('sysparm_testcaseinstance', this._sysId);
	ga.addParam('sysparm_defect', this._getValue('rm_defect_ref'));
	
	this.showLoadingDialog();
	var responseXML = ga.getXMLWait();
	return this._parseResponse(responseXML);
},
_parseResponse: function (responseXML) {
	this.hideLoadingDialog();
	
	var resp = responseXML.getElementsByTagName("result");
	if (resp[0] && resp[0].getAttribute("status") == "success") {
		var isDuplicate = responseXML.documentElement.getAttribute("answer");
		this._removeAllError('tm_ref_choose_dialog');
		
		if (isDuplicate == 'true') {
			this._showFieldError('ref_test_suite_field', getMessage('Already assigned'));
			return false;
		}
	}
	return true;
},
_removeAllError: function (dialogName) {
	$$('#'+dialogName+' .form-group.has-error').each(function(item){
		$(item).removeClassName('has-error');
		$(item).down('.help-block').setStyle({'display':'none'});
	});
},
_showFieldError: function (groupId, message) {
	var $group = $(groupId);
	var $helpBlock = $group.down('.help-block');
	if(!$group.hasClassName('has-error'))
		$group.addClassName('has-error');
	if($helpBlock.getStyle('display')!='inline-block'){
		$helpBlock.update(message);
		$helpBlock.setStyle({'display':'inline-block'});
	}
	
},
type: "tm_AssignDefect"
});
/*! RESOURCE: HR_Utils_UI */
var HR_Utils_UI = Class.create();
HR_Utils_UI.prototype = {
    initialize : function() {
    },
    validatePhoneNumberForField : function(number, isLoading, phoneField) {
	    if (isLoading || !number) {
		    g_form.hideFieldMsg(phoneField, true);
			return;
	    }
		var ajax = new GlideAjax('hr_CaseAjax');
	    ajax.addParam('sysparm_name', 'isPhoneNumberValid');
	    ajax.addParam('sysparm_phoneNumber', number);
		ajax.setWantSessionMessages(false);
		ajax.getXMLAnswer(function(answer) {
			var result = answer.evalJSON();
			if (result.valid) {
				if (number != result.number) {
					g_form.setValue(phoneField, result.number);
				}
			} else {
				g_form.hideFieldMsg(phoneField, true);
				g_form.showErrorBox(phoneField, getMessage('Invalid phone number'));
				return;
			}
			g_form.hideFieldMsg(phoneField, true);
		});
	},
	validatePhoneNumberForFieldSynchronously : function(number, phoneField) {
	    if (!number) {
		    g_form.hideFieldMsg(phoneField, true);
			return;
	    }
		var isValid = false; 
	    var ajax = new GlideAjax('hr_CaseAjax');
	    ajax.addParam('sysparm_name', 'isPhoneNumberValid');
	    ajax.addParam('sysparm_phoneNumber', number);
		ajax.setWantSessionMessages(false);
		ajax.getXMLWait();
		var answer = ajax.getAnswer();
		var result = answer.evalJSON();
		if (result.valid) {
			if (number != result.number) {
				g_form.setValue(phoneField, result.number);
			}
			g_form.hideFieldMsg(phoneField, true);
			isValid = true;
		} else {
			g_form.hideFieldMsg(phoneField, true);
			g_form.showErrorBox(phoneField, getMessage('Invalid phone number'));
			isValid = false;
		}
		return isValid;
	},
    populateContextualSearch : function(searchField) {
	    function triggerKnowledgeSearch() {
		    if (!window.NOW || !window.NOW.cxs_searchService) {
window.setTimeout(triggerKnowledgeSearch, 500);
			    return;
		    }
		    var key = document.createEvent('Events');
		    key.initEvent('keyup', true, true);
		    key.keyCode = 13;
		    g_form.getElement(searchField).dispatchEvent(key);
		    g_form.setDisplay(searchField, false);
	    }
	    var gr = new GlideAjax('hr_CaseAjax');
	    gr.addParam('sysparm_name', 'getCatalogProperties');
	    gr.addParam('sysparm_catalogId', g_form.getParameter('id'));
	    gr.getXMLAnswer(function(answer) {
		    var result = answer.evalJSON();
		    if (result && result[searchField]) {
			    g_form.setValue(searchField, result[searchField]);
			    window.setTimeout(triggerKnowledgeSearch, 100);
		    }
	    });
    },
    catalogAdjustPriorityClientScript : function(control, oldValue, newValue, isLoading) {
	    if (!newValue)
		    return;
	    var userInfo = g_form.getReference('opened_for');
	    var gr;
	    if (userInfo.hasOwnProperty('vip') && userInfo.vip == 'true') {
		    gr = new GlideAjax('hr_CaseAjax');
		    gr.addParam('sysparm_name', 'getDefaultVIPPriority');
		    gr.getXMLAnswer(function(answer) {
			    if (answer)
				    g_form.setValue('priority', answer);
			    else
g_form.setValue('priority', '2');
		    });
	    } else {
		    gr = new GlideAjax('hr_CaseAjax');
		    gr.addParam('sysparm_name', 'getCatalogProperties');
		    gr.addParam('sysparm_catalogId', g_form.getParameter('id'));
		    gr.getXMLAnswer(function(answer) {
			    var result = answer.evalJSON();
			    if (result && result.priority)
				    g_form.setValue('priority', result.priority);
			    else
g_form.setValue('priority', '4');
		    });
	    }
    },
    catalogOpenedForClientScript : function() {
	    if (g_user.hasRole('hr_case_writer'))
		    g_form.setReadonly('opened_for', false);
	    else
		    g_form.setReadonly('opened_for', true);
    },
    type : 'HR_Utils_UI'
};
/*! RESOURCE: ProjectDeleteValidator */
var ProjectDeleteValidator = Class.create();
ProjectDeleteValidator.prototype = {
    initialize: function(projectIds) {
        this._projectIds = projectIds;
        this._hasValidationErrors = false;
        this._validationMessages = [];
    },
    validate: function(callback) {
        var ajaxHelper = new GlideAjax('AjaxProjectUtil');
        ajaxHelper.addParam('sysparm_name', 'canDeleteProjects');
        ajaxHelper.addParam('sysparm_sys_ids', this._projectIds);
        ajaxHelper.setWantSessionMessages(false);
        var that = this;
        ajaxHelper.getXMLAnswer(function(answer) {
            var results = JSON.parse(answer);
            var hasErrors = false;
            if (results && results.length > 0) {
                for (var i = 0; i < results.length; i++) {
                    if (results[i].status === "false") {
                        that._hasValidationErrors = true;
                        that._validationMessages.push(results[i].statusMessage);
                    }
                }
            }
			callback.call(that, that);
        });
    },
    hasValidationErrors: function() {
        return this._hasValidationErrors === true;
    },
	getValidationMessages: function(){
		return this._validationMessages;
	},
    type: "ProjectDeleteValidator"
};
/*! RESOURCE: DemandTaskUtil */
var DemandTaskUtil = Class.create();
DemandTaskUtil.prototype = {
    initialize: function() {
    },
	onCompletionCallback : function() {
		var category = g_form.getValue('category');
		var categoryMsg = 'NA';
		if(category == 'resource_estimate')
			categoryMsg = getMessage('Resource Plan created for demand successfully');
		else if(category == 'cost_estimate')
			categoryMsg = getMessage('Cost Plan created for demand successfully');
		else if(category == 'benefit_estimate')
			categoryMsg = getMessage('Benefit Plan created for demand successfully');
		else if(category == 'risk_assessment')
			categoryMsg = getMessage('Risk created for demand successfully');
		if(categoryMsg != 'NA')
			g_form.addInfoMessage(categoryMsg);
	},
    openDemandTaskCategoryModal: function(title, tableName) {
        try {
            var demand = g_form.getValue('parent');
            if (!demand || demand == null) {
                var gr = new GlideRecord("dmn_demand_task");
                if (gr.get(g_form.getUniqueValue())) {
                    demand = gr.getValue('parent');
                }
            }
            if (demand != '') {
                var ctm = new GlideModalForm(title, tableName, this.onCompletionCallback);
                ctm.setPreference('sysparm_view', 'new');
                ctm.setPreference('sysparm_query', 'task=' + demand);
                ctm.setSysID(-1);
                ctm.setPreference('sysparm_form_only', 'true');
                ctm.setPreference('focusTrap', true);
                ctm.render();
            } 
        } catch (error) {
            jslog('Error while creating record for ' + tableName + '. Error occured : ' + error);
        }
    },
    type: 'DemandTaskUtil',
};
/*! RESOURCE: tm_AddToTestPlanHandler */
var tm_AddToTestPlanHandler = Class.create({
	initialize: function(gr) {
		this._gr=gr;
		this._isList = (gr.type+""=="GlideList2");
		this._tableName         = this._gr.getTableName();
		this._prmErr = [];
		
		var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
		this._mstrDlg = new dialogClass("tm_ref_choose_dialog");
		var titleMsg = '';
		if(this._gr.getTableName() == 'tm_test_case') {
			titleMsg = getMessage("Add Case(s) to Test Plan");
		} else if (this._gr.getTableName() == 'tm_test_suite') {
			titleMsg = getMessage("Add Suite(s) to Test Plan");
		}
		this._mstrDlg.setTitle(titleMsg);
		
		this._mstrDlg.setPreference("sysparam_field_label", getMessage("Test Plan"));
		this._mstrDlg.setPreference("sysparam_reference_table","tm_test_plan");
		this._mstrDlg.setPreference("sysparam_query","active=true");
		
		this._mstrDlg.setPreference("handler",this);
	},
	
	showDialog: function() {
		this._mstrDlg.render();
	},
	
	onSubmit: function() {
		var testPlanId = this._getValue('tm_test_plan_ref');
		if (!this._validate()) {
			return false;
		}
		this._mstrDlg.destroy();
		if(testPlanId) {
			var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
			this._plsWtDlg = new dialogClass("tm_wait_dialog");
			this._plsWtDlg.setTitle(getMessage("Working.  Please wait."));
			this._plsWtDlg.render();
			var ga = new GlideAjax("tm_AjaxProcessor");
			ga.addParam('sysparm_name','addToTestPlan');
			ga.addParam('sysparm_sys_id', this._isList ? this._gr.getChecked() : this._gr.getUniqueValue());
			ga.addParam('sysparm_tm_test_plan', testPlanId);
			ga.addParam('sysparm_tn', this._tableName);
			ga.getXML(this.callback.bind(this));
		}
		return false;
	},
	
	callback: function(response) {
		this._plsWtDlg.destroy();
		
		var resp = response.responseXML.getElementsByTagName("result");
		if (resp[0] && resp[0].getAttribute("status") == "success") {
			return false;
		} else {
			var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
			this._createError = new dialogClass("tm_error_dialog");
			this._createError.setTitle(getMessage("Error while adding Test Cases from selected Test Suite."));
			this._createError.render();
		}
		
	},
	
	_refreshRelatedList: function() {
		this._gForm.setFilterAndRefresh('');
	},
	
	_validate: function() {
		var valid = true;
		this._prmErr = [];
		if(!this._isList)
		this._removeAllError('tm_ref_choose_dialog');
		if (this._getValue('tm_test_plan_ref') == 'undefined' || this._getValue('tm_test_plan_ref').trim() == "") {
			this._prmErr.push(getMessage("Select Test Plan"));
			if(!this._isList)
			this._showFieldError('ref_test_suite_field',this._prmErr[0]);
			valid = false;
		}
		return valid;
	},
	
	_removeAllError: function(dialogName) {
		$$('#'+dialogName+' .form-group.has-error').each(function(item){
			$(item).removeClassName('has-error');
			$(item).down('.help-block').setStyle({'display':'none'});
		});
	},
	_showFieldError: function(groupId,message) {
		var $group = $(groupId);
		var $helpBlock = $group.down('.help-block');
		if(!$group.hasClassName('has-error'))
			$group.addClassName('has-error');
		if($helpBlock.getStyle('display')!='inline-block'){
			$helpBlock.update(message);
			$helpBlock.setStyle({'display':'inline-block'});
		}
	},
	
	
	_getValue: function(inptNm) {
		return gel(inptNm).value;
	},
	
	type: "tm_AddToTestPlanHandler"
});
/*! RESOURCE: GwtDateTimePickerFix */
addLoadEvent(function() {
	if (typeof window.GwtDateTimePicker != 'undefined') {
window.GwtDateTimePicker.prototype.initialize = function(dateFieldId, dateTimeFormat, includeTime, positionElement, defaultValue) {
			this.dayCells = [];
			this.cleanup = [];
			this._getMessages();
			this.includeTime = includeTime;
			this.firstDay = Math.min(Math.max(g_date_picker_first_day_of_week - 1, 0), 6);
			if(isDoctype()) {
				this.modalParent = $j(positionElement || gel(dateFieldId)).parents('.modal');
				this.isInModal = !!this.modalParent.length;
				if(this.isInModal) {
					this.isInModalForm = !!$j(positionElement || gel(dateFieldId))
						.parents('[id*=".form_scroll"]')
						.parents('.modal').length;
				}
			}
			GlideWindow.prototype.initialize.call(this, "GwtDateTimePicker", true);
			this.dateFieldId = dateFieldId;
			var dateField = $(dateFieldId);
			if (!defaultValue)
				defaultValue = dateField.value;
			this.selectedDate = getUserDateTime();
			if (defaultValue) {
				var ms = getDateFromFormat(defaultValue, dateTimeFormat);
				if (ms > 0)
					this.selectedDate = new Date(ms);
			}
			this.date = new Date(this.selectedDate);
			this.setFormat(dateTimeFormat);
			this.removeBody();
			this.clearSpacing();
			this.canFocus = false;
			this._createControls();
			if (positionElement)
				this._moveToPosition(positionElement);
			else if (dateField.next() && dateField.next().type && dateField.next().type != 'hidden')
				this._moveToPosition(dateField.next());
			else
				this._moveToPosition(dateField);
			this.setZIndex(10000);
			this.setShim(true);
			this._shimResize();
			this.keyUpFunc = this.onKeyUp.bind(this);
			Event.observe(this.window, "keypress",  this.keyUpFunc);
			Event.observe(document, "keypress",  this.keyUpFunc);
			Event.observe(window.self, 'beforeunload', this.preventPageLeaveConfirmDialog);
			this.mouseUpFunc = this.onMouseUp.bindAsEventListener(this);
			Event.observe(document, "mouseup", this.mouseUpFunc);
			this.canFocus = true;
			this.focusEditor();
		};
	}
});
/*! RESOURCE: AddScrumTask */
var AddScrumTask = Class.create();
AddScrumTask.prototype = {
	initialize: function () {
		this.list = (typeof g_list != "undefined") ? g_list : null;
		this.storyID = (typeof rowSysId == 'undefined' || rowSysId == null) ? (gel('sys_uniqueValue') ? gel('sys_uniqueValue').value : "") : rowSysId;
		this.setUpFacade();
		this.setUpEvents();
		this.display(true);
		this.checkOKButton();
		this.focusFirstSelectElement();
	},
	
	toggleOKButton: function(visible) {
		$("ok").style.display = (visible?"inline":"none");
	},
	
	setUpFacade: function () {
		var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
		this.dialog = new dialogClass("task_window");
		this.dialog.setTitle(getMessage("Add Scrum Tasks"));
		this.dialog.setPreference('focusTrap', true);
		var mapCount = this.getTypeCounts();
		this.dialog.setBody(this.getMarkUp(mapCount), false, false);
	},
	
	checkOKButton: function() {
		var visible = false;
		var self = this;
		
		$('task_window').select("select").each(function(elem) {
			if (elem.value + "" != "0") visible = true;
				
			if (!elem.onChangeAdded) {
				elem.onChangeAdded = true;
				
				elem.on("change", function() {
					self.checkOKButton();
				});
			}
		});
		
		this.toggleOKButton(visible);
	},
	
	focusFirstSelectElement: function() {
		$('task_window').select("select")[0].focus();
	},
	
	getTypeCounts: function() {
		var mapLabel = this.getLabels("rm_scrum_task", "type");
		var mapCount = {};
		for (var strKey in mapLabel) {
			mapCount[strKey] = getPreference("com.snc.sdlc.scrum.pp.tasks." + strKey, 0);
		}
		return mapCount;
	},
	
	setUpEvents: function () {
		var self = this, dialog = this.dialog;
		
		$("ok").on("click", function () {
			var mapTaskData = {};
			if (self.fillDataMap(mapTaskData)) {
				var taskProducer = new GlideAjax("ScrumAjaxTaskProducer");
				for (var strKey in mapTaskData) {
					taskProducer.addParam("sysparm_" + encodeURIComponent(strKey), mapTaskData[strKey]);
				}
				
				self.showStatus("Adding tasks...");
				
				taskProducer.getXML(function () {
					self.refresh();
					dialog.destroy();
				});
			} else {
				dialog.destroy();
			}
		});
		$("cancel").on("click", function () {
			dialog.destroy();
		});
	},
	
	refresh: function() {
		if (this.list) this.list.refresh();
			else {
				var tableName = 'rm_story';
				if(g_form)
					tableName = g_form.tableName;
				this.reloadList(tableName + ".rm_scrum_task.story");
			}
		},
	
	getSysID: function() {
		return this.storyID;
	},
	
	fillDataMap: function (mapTaskData) {
		var bTasksRequired = false;
		mapTaskData.name = "createTasks";
		mapTaskData.sys_id = this.getSysID();
		var mapDetails = this.getLabels("rm_scrum_task", "type");
		var arrTaskTypes = [];
		
		for (var key in mapDetails) {
			arrTaskTypes.push(key);
		}
		
		for (var nSlot = 0; nSlot < arrTaskTypes.length; ++nSlot) {
			var strTaskType = arrTaskTypes[nSlot];
			var strTaskData = $(strTaskType).getValue();
			mapTaskData[strTaskType] = strTaskData;
			setPreference("com.snc.sdlc.scrum.pp.tasks." + strTaskType, strTaskData);
			if (strTaskData != "0") {
				bTasksRequired = true;
			}
		}
		
		return bTasksRequired;
	},
	
	getMarkUp: function (mapCounts) {
		function getSelectMarkUp(strFieldId, nValue) {
			var strMarkUp = '<select class="form-control select2" id="' + strFieldId + '" name="' + strFieldId + '">';
			
			for (var nSlot = 0; nSlot <= 10; nSlot++) {
				if (nValue != 0 && nValue == nSlot) {
strMarkUp += '<option value="'+nSlot+'" selected="selected">'+nSlot+'</option>';
				} else {
strMarkUp += '<option value="'+nSlot+'">'+nSlot+'</option>';
				}
			}
			
strMarkUp += "</select>";
			return strMarkUp;
		}
		
		function buildRow(strMessage, nValue) {
			var row = '';
			row += '<div class="row" style="padding-top:10px;">';
			row +=     '<div class="form-group">';
			row +=         '<label class="control-label col-sm-3" for="'+strMessage+'" style="white-space:nowrap;">';
			row +=             strMessage;
row +=         '</label>';
			row +=         '<span class="col-sm-9">';
			row +=             getSelectMarkUp(strMessage, nValue);
row +=         '</span>';
row +=     '</div>';
row += '</div>';
			
			return row;
		}
		
		function buildTable(mapDetails, mapCounts) {
			var arrDetails = [];
			
			for (var strKey in mapDetails) {
				arrDetails.push(strKey + "");
			}
			
			arrDetails.sort();
			var strBuf = '';
			
			for (var index = 0; index < arrDetails.length; ++index) {
				var nCount = mapCounts[arrDetails[index]];
				strBuf += buildRow(arrDetails[index], nCount);
			}
			
			strBuf += '';
			return strBuf;
		}
		
		var mapLabels = this.getLabels("rm_scrum_task", "type");
		return buildTable(mapLabels, mapCounts) + "<div id='task_controls' style='text-align:right;padding-top:20px;'>" +
"<button id='cancel' type='button' class='btn btn-default'>" + getMessage('Cancel') + "</button>" +
"&nbsp;&nbsp;<button id='ok' type='button' class='btn btn-primary'>" + getMessage('OK') + "</button></div>";
	},
	
	reloadForm: function () {
		document.location.href = document.location.href;
	},
	
	reloadList: function (strListName) {
		if(typeof GlideList2 === 'undefined')
			return;
		var list = GlideList2.get(strListName);
		if(list)
			list.refresh();
	},
	
	showStatus: function (strMessage) {
		$("task_controls").update(getMessage('Loading...'));
	},
	
	display: function(bIsVisible) {
		$("task_window").style.visibility = (bIsVisible ? "visible" : "hidden");
	},
	
	getLabels: function(strTable, strAttribute) {
		var taskProducer = new GlideAjax("ScrumAjaxTaskProducer");
		taskProducer.addParam("sysparm_name" ,"getLabels");
		taskProducer.addParam("sysparm_table", strTable);
		taskProducer.addParam("sysparm_attribute", strAttribute);
		var result = taskProducer.getXMLWait();
		return this._parseResponse(result);
	},
	
	_parseResponse: function(resultXML) {
		var jsonStr = resultXML.documentElement.getAttribute("answer");
		var map = JSON.parse(jsonStr);
		return map;
	}
};
/*! RESOURCE: populate_scope_editor_slushbucket */
function populateLeftAndRightScopeEditor(dataLeft, dataRight) {
	slushbucketPopulateHelper(gel('scope_slush_left'), dataLeft);
	slushbucketPopulateHelper(gel('scope_slush_right'), dataRight);
}
function slushbucketPopulateHelper(select, data) {
	select.options.length = 0;
	if(data) {
		var list = data.split('^');
		for (var i = 0; i != list.length; i++) {
			var t = list[i].split(':');
			var label = atob(t[0]);
			var value = atob(t[1]);
			var o = new Option(label, value);
			select.options[select.options.length] = o;
		}
	}
}
function cancel() {
	g_form.fieldChanged('scope_slush', false);
	setTimeout(function() {reloadWindow(self);}, 1);
}
function editScopes() {
	g_form.fieldChanged('scope_slush', false);
	var jsonScopes = {
		"additionalScopes": scope_slush.getValues(scope_slush.getRightSelect()) || [],
		"removedScopes": scope_slush.getValues(scope_slush.getLeftSelect()) || []
	};
	var stringScopes = JSON.stringify(jsonScopes);
	
	var ga = new GlideAjax('AJAXAddScopes');
	ga.addParam('sysparm_name', 'updateScopes');
	ga.addParam('sysparm_scopes', stringScopes);
	ga.addParam('sysparm_oauthEntityId', g_form.getUniqueValue());
	ga.getXML(function(result) {
		g_navigation.reloadWindow();
	});
}
/*! RESOURCE: UpgradePlanProgressViewerUtil */
var UpgradePlanProgressViewerUtil = Class.create();
UpgradePlanProgressViewerUtil.prototype = {
	initialize: function() {
	},
	renderProgressViewer: function(title, progressId) {
		var self = this;
		var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
		var modal = new dialogClass('hierarchical_progress_viewer', false, '40em', '10.5em');
	
		modal.setTitle(title);
		modal.setPreference('sysparm_renderer_execution_id', progressId);
		modal.setPreference('sysparm_button_close', new GwtMessage().getMessage('Close'));
		modal.setPreference('sysparm_renderer_hide_drill_down', true);
	
		modal.on('bodyrendered', function() {
			self.disableModalCloseButton();
		});
	
		modal.on('renderStatus', function(statusObject) {
			self.addResultButtonIfApplicable(statusObject);
			self.addViewDetailsButtonIfApplicable(statusObject, progressId, modal);
		});
	
		modal.on('executionComplete', function() {
			self.updateModalButtons(modal);
		});
	
		modal.render();
	},
	addResultButtonIfApplicable: function(statusObject) {
		if (!this.isUpgradePlanComplete(statusObject))
			return;
		addButtonToProgressFooter(this.createResultButton(statusObject.result.upgradePlanSysId));
	},
	addViewDetailsButtonIfApplicable: function(statusObject, progressId, modal) {
		if (statusObject && statusObject.result && statusObject.result.succeedWithWarning && !$('sysparm_button_view_details') && !modal.title.includes(' - Execution Details'))
			addButtonToProgressFooter(this.createViewDetailsButton(progressId, modal));
	},
	disableModalCloseButton: function() {
		var closeBtn = $('sysparm_button_close');
		if (closeBtn)
			closeBtn.disable();
	},
	isUpgradePlanComplete: function(statusObject) {
		return statusObject && statusObject.result && statusObject.result.upgradePlanSysId && !$('sysparm_button_result_page');
	},
	createResultButton: function(upgradePlanSysId) {
		var resultButton = new Element('button', {
			'id': 'sysparm_button_result_page',
			'type': 'button',
			'class': 'btn btn-default',
			'style': 'margin-left: 5px;'
		}).update(new GwtMessage().getMessage('Go to Upgrade Plan'));
		resultButton.onclick = function() {
			window.location = 'sys_upgrade_plan.do?sys_id=' + upgradePlanSysId;
		};
		return resultButton;
	},
	createViewDetailsButton: function(progressId, modal) {
		var viewDetailsButton = new Element('button', {
			'id': 'sysparm_button_view_details',
			'type': 'button',
			'class': 'btn btn-default',
			'style': 'margin-left: 5px;'
		}).update(new GwtMessage().getMessage('View Details'));
		viewDetailsButton.onclick = function() {
			modal.setPreference('sysparm_renderer_hide_drill_down', false);
			modal.setTitle(modal.title + ' - Execution Details');
			modal.render();
		};
		return viewDetailsButton;
	},
	updateModalButtons: function(modal) {
		var closeBtn = $('sysparm_button_close');
		if (closeBtn) {
			closeBtn.onclick = function() {
				modal.destroy();
				reloadWindow(window);
			};
		}
		var resultBtn = $('sysparm_button_result_page');
		if (resultBtn)
			resultBtn.className += ' btn-primary';
		var viewDetailsBtn = $('sysparm_button_view_details');
		if (viewDetailsBtn)
			viewDetailsBtn.className += ' btn-secondary';
	},
	type: 'UpgradePlanProgressViewerUtil'
};
/*! RESOURCE: UI Action Context Menu */
function showUIActionContext(event) {
   if (!g_user.hasRole("ui_action_admin"))
      return;
   var element = Event.element(event);
   if (element.tagName.toLowerCase() == "span")
      element = element.parentNode;
   var id = element.getAttribute("gsft_id");
   var mcm = new GwtContextMenu('context_menu_action_' + id);
   mcm.clear();
   mcm.addURL(getMessage('Edit UI Action'), "sys_ui_action.do?sys_id=" + id, "gsft_main");
   contextShow(event, mcm.getID(), 500, 0, 0);
   Event.stop(event);
}
addLoadEvent(function() {
   document.on('contextmenu', '.action_context', function (evt, element) {
      showUIActionContext(evt);
   });
});
/*! RESOURCE:  cert_redirect_to_directions */
function cert_redirect_to_directions()
{
window.open("https://doclibrary.travelport.com/dat/Data%20Center%20Operations/Comodo%20Certificate%20Management/Comodo%20Public%20Key%20Infrastructure%20Certificate%20Support%20Doc.docx?Web=1");
}
/*! RESOURCE: AddMembersFromGroup */
var AddMembersFromGroup = Class.create(GlideDialogWindow, {
   initialize: function () {
      this.setUpFacade();
   },
   
   setUpFacade: function () {
      GlideDialogWindow.prototype.initialize.call(this, "task_window", false);
      this.setTitle(getMessage("Add Members From Group"));
      this.setBody(this.getMarkUp(), false, false); 
   },
   setUpEvents: function () {
      var dialog = this;
      var okButton = $("ok");
      if (okButton) {
         okButton.on("click", function () {
         var mapData = {};
         if (dialog.fillDataMap (mapData)) {
            var processor = new GlideAjax("ScrumAjaxAddReleaseTeamMembersProcessor");
            for (var strKey in mapData) {
               processor.addParam(strKey, mapData[strKey]);
            }
            dialog.showStatus(getMessage("Adding group users..."));
            processor.getXML(function () {
               dialog.refresh();
               dialog._onCloseClicked();
            });            
         } else {
            dialog._onCloseClicked();  
         }
      });
      }
      var cancelButton = $("cancel");
      if (cancelButton) {
      cancelButton.on("click", function () {
         dialog._onCloseClicked(); 
      });
      }
      var okNGButton = $("okNG");
      if (okNGButton) {
      okNGButton.on("click", function () {
         dialog._onCloseClicked(); 
      });
      }
      var cancelNGButton = $("cancelNG");
      if (cancelNGButton) {
      cancelNGButton.on("click", function () {
         dialog._onCloseClicked(); 
      });
      }
   },
   refresh: function(){
      GlideList2.get("scrum_pp_team.scrum_pp_release_team_member.team").refresh();
   },
   getScrumReleaseTeamSysId: function () {
      return g_form.getUniqueValue() + "";
   },
   getUserChosenGroupSysIds: function () {
      return $F('groupId') + ""; 
   },
   showStatus: function (strMessage) {
      $("task_controls").update(strMessage);
   },
   
   display: function(bIsVisible) {
      $("task_window").style.visibility = (bIsVisible ? "visible" : "hidden");   
   },
  getRoleIds: function () {
      var arrRoleNames = ["scrum_user", "scrum_admin", "scrum_release_planner", "scrum_sprint_planner", "scrum_story_creator"];
      var arrRoleIds = [];
      var record = new GlideRecord ("sys_user_role");
      record.addQuery ("name", "IN", arrRoleNames.join (","));
      record.query ();
      while (record.next ())
         arrRoleIds.push (record.sys_id + "");
      return arrRoleIds;
  },
  hasScrumRole: function (roleSysId, arrScrumRoleSysIds) {
     for (var index = 0; index < arrScrumRoleSysIds.length; ++index)
        if (arrScrumRoleSysIds[index] == "" + roleSysId)
           return true;
  
     var record = new GlideRecord ("sys_user_role_contains");
     record.addQuery("role", roleSysId);
     record.query ();
     while (record.next())
       if (this.hasScrumRole (record.contains, arrScrumRoleSysIds))
         return true;
     return false;
  },
  getGroupIds: function () {  
     var arrScrumRoleIds = this.getRoleIds ();
     var arrGroupIds = [];
     var record = new GlideRecord ("sys_group_has_role");
     record.query ();
     while (record.next ())
        if (this.hasScrumRole (record.role, arrScrumRoleIds))
           arrGroupIds.push (record.group + "");
     return arrGroupIds;
   },
   
   getGroupInfo: function () {
      var mapGroupInfo = {};
      var arrRoleIds = this.getRoleIds ();
      var arrGroupIds = this.getGroupIds (arrRoleIds);
      var record = new GlideRecord ("sys_user_group");
      record.addQuery("sys_id", "IN", arrGroupIds.join (","));
      record.query ();
      while (record.next ()) {
         var strName = record.name + "";
         var strSysId = record.sys_id + "";
         mapGroupInfo [strName] = {name: strName, sysid: strSysId};
      }
      return mapGroupInfo;
   },
   getMarkUp: function () {
      var groupAjax = new GlideAjax('ScrumUserGroupsAjax');
      groupAjax.addParam('sysparm_name', 'getGroupInfo');
      groupAjax.getXML(this.generateMarkUp.bind(this));
   },
   generateMarkUp: function(response) {
      var mapGroupInfo = {};
      var groupData = response.responseXML.getElementsByTagName("group");
	  var strName, strSysId;
      for (var i = 0; i < groupData.length; i++) {
        strName = groupData[i].getAttribute("name");
        strSysId = groupData[i].getAttribute("sysid");
        mapGroupInfo[strName] = {
          name: strName,
          sysid: strSysId
        };
      }
      var arrGroupNames = [];
      for (var strGroupName in mapGroupInfo) {
        arrGroupNames.push (strGroupName + "");
      }
      arrGroupNames.sort ();
      var strMarkUp = "";
      if (arrGroupNames.length > 0) {
         var strTable = "<table><tr><td><label for='groupId'><select id='groupId'>";
         for (var nSlot = 0; nSlot < arrGroupNames.length; ++nSlot) {
            strName = arrGroupNames[nSlot];
            strSysId = mapGroupInfo [strName].sysid;
strTable += "<option value='" + strSysId + "'>" + strName + "</option>";
         }
strTable += "</select></label></td></tr></table>";
      
      strMarkUp = "<div id='task_controls'>" + strTable + 
                    "<div style='text-align: right;'>" +
"<button id='ok' type='button'>" + getMessage("OK") + "</button>" +
"<button id='cancel' type='button'>" + getMessage("Cancel") + "</button></div></div>";
      } else {
strMarkUp = "<div id='task_controls'><p>No groups with scrum_user role found</p>" +
                        "<div style='text-align: right;'>" +
"<button id='okNG' type='button'>" + getMessage("OK") + "</button>" +
                         "<button id='cancelNG' type='button'>" + getMessage("Cancel") + 
"</button></div></div>";
      }
      this.setBody(strMarkUp, false, false);
      this.setUpEvents();
      this.display(true);
      this.setWidth(180);
   },
   fillDataMap: function (mapData) {
      var strChosenGroupSysId = this.getUserChosenGroupSysIds ();
      if (strChosenGroupSysId) {
         mapData.sysparm_name = "createReleaseTeamMembers";
         mapData.sysparm_sys_id = this.getScrumReleaseTeamSysId ();
         mapData.sysparm_groups = strChosenGroupSysId;
         return true;
      } else {
         return false;
      }
   }
});
/*! RESOURCE: ValidateStartEndDates */
function validateStartEndDate(startDateField, endDateField, processErrorMsg){
	var startDate = g_form.getValue(startDateField);
	var endDate = g_form.getValue(endDateField);
	var format = g_user_date_format;
	if (startDate === "" || endDate === "")
		return true;
	var startDateFormat = getDateFromFormat(startDate, format);
	var endDateFormat = getDateFromFormat(endDate, format);
	
	if (startDateFormat < endDateFormat)
		return true;
	
	if (startDateFormat === 0 || endDateFormat === 0){
		processErrorMsg(new GwtMessage().getMessage("{0} is invalid", g_form.getLabelOf(startDate === 0? startDateField : endDateField)));
		return false;
	}
	if (startDateFormat > endDateFormat){
		processErrorMsg(new GwtMessage().getMessage("{0} must be after {1}", g_form.getLabelOf(endDateField), g_form.getLabelOf(startDateField)));
		return false;
	}
	
	return true;
}
/*! RESOURCE: AddTeamMembers */
var AddTeamMembers = Class.create(GlideDialogWindow, {
   initialize: function () {
      this.setUpFacade();
   },
   
   setUpFacade: function () {
      GlideDialogWindow.prototype.initialize.call(this, "task_window", false);
      this.setTitle(getMessage("Add Team Members"));
      this.setBody(this.getMarkUp(), false, false); 
   },
   setUpEvents: function () {
      var dialog = this;
      var okButton = $("ok");
      if (okButton) {
         okButton.on("click", function () {
         var mapData = {};
         if (dialog.fillDataMap (mapData)) {
            var processor = new GlideAjax("ScrumAjaxAddReleaseTeamMembers2Processor");
            for (var strKey in mapData) {
               processor.addParam(strKey, mapData[strKey]);
            }
            dialog.showStatus(getMessage("Adding team members..."));
            processor.getXML(function () {
               dialog.refresh();
               dialog._onCloseClicked();
            });            
         } else {
            dialog._onCloseClicked();  
         }
      });
      }
      var cancelButton = $("cancel");
      if (cancelButton) {
         cancelButton.on("click", function () {
            dialog._onCloseClicked(); 
      });
      }
      var okNGButton = $("okNG");
      if (okNGButton) {
         okNGButton.on("click", function () {
            dialog._onCloseClicked(); 
      });
      }
      var cancelNGButton = $("cancelNG");
      if (cancelNGButton) {
         cancelNGButton.on("click", function () {
            dialog._onCloseClicked(); 
      });
      }
      
      var teamCombo = $("teamId");
      if (teamCombo) {
         teamCombo.on("change", function (){
            dialog.updateMembers ();
         });
      }
   },
   
   updateMembers: function () {
      var arrMemberInfo = [];
      var teamCombo = $("teamId");
      if (teamCombo) {      
         var strTeamSysId = teamCombo.value;
         var recTeamMember = new GlideRecord ("scrum_pp_release_team_member");
         recTeamMember.addQuery ("team", strTeamSysId);
         recTeamMember.query ();
         while (recTeamMember.next ()) {
            var recSysUser = new GlideRecord ("sys_user");
            recSysUser.addQuery ("sys_id", recTeamMember.name);
            recSysUser.query ();
            var strName = recSysUser.next () ? recSysUser.name : "";
            var strPoints = recTeamMember.default_sprint_points + "";
            arrMemberInfo.push ({name: strName, points: strPoints});
         }
      }
      if (arrMemberInfo.length > 0) {
         var strHtml = "<tr><th style='text-align: left; white-space: nowrap'>" + 
"Member</th><th style='text-align: left; white-space: nowrap'>Sprint Points</th><tr>";
         for (var nSlot = 0; nSlot < arrMemberInfo.length; ++nSlot) {
            var strMemberName = arrMemberInfo[nSlot].name + "";
            var strMemberPoints = arrMemberInfo[nSlot].points + "";
            strHtml += "<tr><td  style='text-align: left; white-space: nowrap'>" + strMemberName + 
"</td><td style='text-align: left; white-space: nowrap'>" + strMemberPoints + "</td></tr>";
         }
         $("memberId").update (strHtml);
      } else {
$("memberId").update ("<tr><td style='font-weight: bold'>"+getMessage("No team members")+"</td></tr>");
      }
   },
   refresh: function(){
      GlideList2.get("scrum_pp_team.scrum_pp_release_team_member.team").refresh();
   },
   getScrumReleaseTeamSysId: function () {
      return g_form.getUniqueValue() + "";
   },
   getUserChosenTeamSysIds: function () {
      return $F('teamId') + ""; 
   },
   showStatus: function (strMessage) {
      $("task_controls").update(strMessage);
   },
   
   display: function(bIsVisible) {
      $("task_window").style.visibility = (bIsVisible ? "visible" : "hidden");   
   },
   getMarkUp: function () {
      var groupAjax = new GlideAjax('ScrumUserGroupsAjax');
      groupAjax.addParam('sysparm_name', 'getTeamInfo');
      groupAjax.addParam('sysparm_scrum_team_sysid', this.getScrumReleaseTeamSysId());
      groupAjax.getXML(this.generateMarkUp.bind(this));
   },
   generateMarkUp: function(response) {
      var mapTeamInfo = {};
      var teamData = response.responseXML.getElementsByTagName("team");
	  var strName, strSysId;
      for (var i = 0; i < teamData.length; i++) {
         strName = teamData[i].getAttribute("name");
         strSysId = teamData[i].getAttribute("sysid");
         mapTeamInfo[strName] = {
            name: strName,
            sysid: strSysId
         };
      }
   
      var arrTeamNames = [];
      for (var strTeamName in mapTeamInfo) {
         arrTeamNames.push (strTeamName + "");
      }
      arrTeamNames.sort ();
      var strMarkUp = "";
      if (arrTeamNames.length > 0) {
var strTable = "<table><tr><td><label for='teamId'>"+getMessage("Team")+"</label>&nbsp;<select id='teamId'>";
         for (var nSlot = 0; nSlot < arrTeamNames.length; ++nSlot) {
            strName = arrTeamNames[nSlot];
            strSysId = mapTeamInfo [strName].sysid;
strTable += "<option value='" + strSysId + "'>" + strName + "</option>";
         }
strTable += "</select></label></td></tr></table>";
var strTable2 = "<table style='width: 100%;'><tr><td style='width: 50%;'></td><td><table id='memberId'></table></td><td style='width: 50%;'></td></tr></table>";
      
         strMarkUp = "<div id='task_controls' style='overflow: auto;>" + strTable + strTable2 + 
"</div><table style='width: 100%'><tr><td style='white-space: nowrap; text-align: right;'><button id='ok' type='button'>" + getMessage("OK") + "</button>" +
"<button id='cancel' type='button'>" + getMessage("Cancel") + "</button></td></tr></table>";
      } else {
strMarkUp = "<div id='task_controls'><p>No release teams found</p>" +
"<table style='width: 100%'><tr><td style='white-space: nowrap; text-align: right;'><button id='okNG' type='button'>" + getMessage("OK") + "</button>" +
"<button id='cancelNG' type='button'>" + getMessage("Cancel") + "</button></td></tr></table></div>";
      }
      this.setBody(strMarkUp, false, false); 
      this.setUpEvents();
      this.display(true);
      this.setWidth(280);
   },
   fillDataMap: function (mapData) {
      var strChosenTeamSysId = this.getUserChosenTeamSysIds ();
      if (strChosenTeamSysId) {
         mapData.sysparm_name = "createReleaseTeamMembers";
         mapData.sysparm_sys_id = this.getScrumReleaseTeamSysId ();
         mapData.sysparm_teams = strChosenTeamSysId;
         return true;
      } else {
         return false;
      }
   }
});
/*! RESOURCE: ScrumAddSprints */
var ScrumAddSprints = Class.create({
    initialize: function(gr) {
        this._gr=gr;
        this._prmNms  = ["spName","spDuration","spStartDate","spStartNum","spNum","_tn","_sys_id"];
        this._dateFN = ["spStartDate"];
        this._refObs = [];
        this._prmVls = [];
        for (var i=0;i<this._prmNms.length;i++) {
            this._prmVls[this._prmNms[i]]="";
        }
        this._prmErr = [];
        var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
        this._crtDlg = new dialogClass("scrum_add_sprints_dialog");
        this._crtDlg.setTitle("Add Sprints");
        this._crtDlg.setPreference("_tn",this._gr.getTableName());
        this._crtDlg.setPreference("_sys_id", (this._gr.getUniqueValue()));
        this._crtDlg.setPreference("handler",this);
    },
    showDialog: function() {
        this._crtDlg.render();
    },
    onSubmit: function() {
        this._readFormValues();
        if (!this._validate()) {
            var errMsg = "Before you submit:";
            for (var i = 0; i < this._prmErr.length; i++) {
                errMsg += "\n * "+this._prmErr[i];
            }
            alert(errMsg);
			$j('#spName').focus();
            return false;
        }
        this._crtDlg.destroy();
        var ga = new GlideAjax("ScrumAddSprintsAjaxProcessor");
        ga.addParam("sysparm_name","checkDuration");
        for (var i = 0; i < this._prmNms.length; i++ ) {
            ga.addParam(this._prmNms[i],this._prmVls[this._prmNms[i]]);
        }
        ga.getXML(this.checkComplete.bind(this));
        return false;
    },
    checkComplete: function(response) {
        var resp = response.responseXML.getElementsByTagName("item");
        if (resp[0].getAttribute("result") == "success") {
            var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
            this._plsWtDlg = new dialogClass("scrum_please_wait");
            this._plsWtDlg.setTitle("Working.  Please wait.");
            this._plsWtDlg.render();
            var ga = new GlideAjax("ScrumAddSprintsAjaxProcessor");
            ga.addParam("sysparm_name","addSprints");
            for (var i = 0; i < this._prmNms.length; i++ ) {
                ga.addParam(this._prmNms[i],this._prmVls[this._prmNms[i]]);
            }
            ga.getXML(this.createComplete.bind(this));
            return false;
        }
        var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
        this._rlsPshDlg = new dialogClass("scrum_release_push_confirm_dialog");
        this._rlsPshDlg.setTitle("Modify Release Dates");
        this._rlsPshDlg.setPreference("handler",this);
        this._rlsPshDlg.render();
    },
    confirmReleasePush: function() {
        this._rlsPshDlg.destroy();
        var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
        this._plsWtDlg = new dialogClass("scrum_please_wait");
        this._plsWtDlg.setTitle("Working.  Please wait.");
        this._plsWtDlg.render();
        var ga = new GlideAjax("ScrumAddSprintsAjaxProcessor");
        ga.addParam("sysparm_name","addSprints");
        for (var i = 0; i < this._prmNms.length; i++ ) {
            ga.addParam(this._prmNms[i],this._prmVls[this._prmNms[i]]);
        }
        ga.getXML(this.createComplete.bind(this));
        return false;
    },
    cancelReleasePush: function(response) {
        this._rlsPshDlg.destroy();
        window.location.reload();
        return false;
    },
    createComplete: function(response) {
        this._plsWtDlg.destroy();
        var resp = response.responseXML.getElementsByTagName("item");
        if (resp[0].getAttribute("result") == "success") {
            this._sprints = response.responseXML.documentElement.getAttribute("answer");
            var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
            this._viewConfirm = new dialogClass("scrum_sprints_view_confirm_dialog");
            this._viewConfirm.setTitle("Sprints Created");
            this._viewConfirm.setPreference("handler",this);
            this._viewConfirm.render();
        }
        else {
            var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
            this._createError = new dialogClass("scrum_error");
            this._createError.setTitle("Error Creating Sprints");
            this._createError.setPreference("handler",this);
            this._createError.render();
        }
    },
    viewConfirmed: function() {
        this._viewConfirm.destroy();
        window.location="rm_sprint_list.do?sysparm_query=numberIN"+this._sprints+"&sysparm_view=scrum";
        return false;
    },
    viewCancelled: function() {
        this._viewConfirm.destroy();
        window.location.reload();
        return false;
    },
    popCal: function(dateFieldId) {
        return new GwtDateTimePicker(dateFieldId,g_user_date_time_format, true);
    },
    _validate: function() {
        var valid = true;
        this._prmErr = [];
        if (this._prmVls["spName"] == "") {
            this._prmErr.push("You must supply a Name");
            valid = false;
        }
        if (this._prmVls["spDuration"] == "" || isNaN(this._prmVls['spDuration'])) {
            this._prmErr.push("You must supply a valid numeric duration");
            valid = false;
        }
        if (this._prmVls["spStartDate"] == "") {
            this._prmErr.push("You must supply a Start Date");
            valid = false;
        }
        if (this._prmVls["spNum"] == "" || isNaN(this._prmVls['spNum'])) {
            this._prmErr.push("You must supply a valid Number of Sprints to create");
            valid = false;
        }
        if (this._prmVls["spStartNum"] == "" || isNaN(this._prmVls['spStartNum'])) {
            this._prmErr.push("You must supply a valid starting number");
            valid = false;
        }
        return valid;
    },
    _readFormValues: function() {
        for (var i=0;i<this._prmNms.length;i++) {
            var frmVl = this._getValue(this._prmNms[i]);
            if ((typeof frmVl === "undefined") || frmVl == "undefined" || frmVl == null || frmVl == "null") {
                frmVl = "";
            }
            this._prmVls[this._prmNms[i]] = frmVl;
        }
    },
    _getValue: function(inptNm) {
        return gel(inptNm).value;
    },
    type: "ScrumAddSprints"
});
/*! RESOURCE: pdb_HighchartsConfigBuilder */
var HighchartsBuilder = {
	getChartConfig: function(chartOptions, tzOffset) {
		var chartTitle = chartOptions.title.text,
			xAxisTitle = chartOptions.xAxis.title.text,
			xAxisCategories = chartOptions.xAxis.categories,
			yAxisTitle = chartOptions.yAxis.title.text,
			series = chartOptions.series;
		this.convertEpochtoMs(xAxisCategories);
		this.formatDataSeries(xAxisCategories, series);
		var config = {
			chart: {
				type: 'area',
				zoomType: 'x'
			},
			credits: {
				enabled: false
			},
			title: {
				text: chartTitle
			},
			xAxis: {
				type: 'datetime',
				title: {
					text: xAxisTitle,
					style: {textTransform: 'capitalize'}
				}
			},
			yAxis: {
				reversedStacks: false,
				title: {
					text: yAxisTitle,
					style: {textTransform: 'capitalize'}
				}
			},
			plotOptions: {
				area: {
					stacking: 'normal'
				},
				series: {
					marker: {
						enabled: true,
						symbol: 'circle',
						radius: 2
					},
					step: 'center'
				}
			},
			tooltip: {
				valueDecimals: 2,
				style: {
					whiteSpace: "wrap",
					width: "200px"
				}
			},
			series: series
		};
var convertedOffset = -1 * (tzOffset/60);
		Highcharts.setOptions({
			lang: {
				thousandsSep: ','
			},
			global: {
				timezoneOffset: convertedOffset
			}
		});
		return config;
	},
    convertEpochtoMs: function(categories) {
		categories.forEach(function(point, index, arr) {
			arr[index] *= 1000;
		});
	},
	formatDataSeries: function(categories, series) {
		series.forEach(function(row, index, arr) {
			arr[index].data.forEach(function(innerRow, innerIndex, innerArr) {
				var value = innerRow;
				if (value == "NaN") {
					value = 0;
				}
			    var xValue = categories[innerIndex];
				innerArr[innerIndex] = [xValue, value];
			});
		});
	}
};
/*! RESOURCE: ScrumCloneReleaseTeamDialog */
var ScrumCloneReleaseTeamDialog = Class.create();
ScrumCloneReleaseTeamDialog.prototype = {
   initialize: function () {
      this.setUpFacade();
   },
   
   setUpFacade: function () {
      var dialogClass = window.GlideModal ? GlideModal : GlideDialogWindow;
      this._mstrDlg = new dialogClass("task_window");
      this._mstrDlg.setTitle(getMessage("Add Team Members"));
      this._mstrDlg.setBody(this.getMarkUp(), false, false);
   },
   setUpEvents: function () {
      var dialog = this._mstrDlg;
	  var _this = this;
      var okButton = $("ok");
      if (okButton) {
         okButton.on("click", function () {
         var mapData = {};
         if (_this.fillDataMap (mapData)) {
            var processor = new GlideAjax("ScrumAjaxAddReleaseTeamMembers2Processor");
            for (var strKey in mapData) {
               processor.addParam(strKey, mapData[strKey]);
            }
            _this.showStatus(getMessage("Adding team members..."));
            processor.getXML(function () {
               _this.refresh();
               dialog.destroy();
            });            
         } else {
            dialog.destroy();
         }
      });
      }
      var cancelButton = $("cancel");
      if (cancelButton) {
         cancelButton.on("click", function () {
            dialog.destroy();
      });
      }
      var okNGButton = $("okNG");
      if (okNGButton) {
         okNGButton.on("click", function () {
            dialog.destroy();
      });
      }
      var cancelNGButton = $("cancelNG");
      if (cancelNGButton) {
         cancelNGButton.on("click", function () {
            dialog.destroy();
      });
      }
      
      var teamCombo = $("teamId");
      if (teamCombo) {
         teamCombo.on("change", function (){
            _this.updateMembers ();
         });
      }
   },
   
   updateMembers: function () {
      var arrMemberInfo = [];
      var teamCombo = $("teamId");
      if (teamCombo) {      
         var strTeamSysId = teamCombo.value;
         var recTeamMember = new GlideRecord ("scrum_pp_release_team_member");
         recTeamMember.addQuery ("team", strTeamSysId);
         recTeamMember.query ();
         while (recTeamMember.next ()) {
            var recSysUser = new GlideRecord ("sys_user");
            recSysUser.addQuery ("sys_id", recTeamMember.name);
            recSysUser.query ();
            var strName = recSysUser.next () ? recSysUser.name : "";
            var strPoints = recTeamMember.default_sprint_points + "";
            arrMemberInfo.push ({name: strName, points: strPoints});
         }
      }
      if (arrMemberInfo.length > 0) {
         var strHtml = "<tr><th style='text-align: left; white-space: nowrap'>" + 
"Member</th><th style='text-align: left; white-space: nowrap'>Sprint Points</th><tr>";
         for (var nSlot = 0; nSlot < arrMemberInfo.length; ++nSlot) {
            var strMemberName = arrMemberInfo[nSlot].name + "";
            var strMemberPoints = arrMemberInfo[nSlot].points + "";
            strHtml += "<tr><td  style='text-align: left; white-space: nowrap'>" + strMemberName + 
"</td><td style='text-align: left; white-space: nowrap'>" + strMemberPoints + "</td></tr>";
         }
         $("memberId").update (strHtml);
      } else {
$("memberId").update ("<tr><td style='font-weight: bold'>"+getMessage("No team members")+"</td></tr>");
      }
   },
   refresh: function(){
      GlideList2.get("scrum_pp_team.scrum_pp_release_team_member.team").refresh();
   },
   getScrumReleaseTeamSysId: function () {
      return g_form.getUniqueValue() + "";
   },
   getUserChosenTeamSysIds: function () {
      return $F('teamId') + ""; 
   },
   showStatus: function (strMessage) {
      $("task_controls").update(strMessage);
   },
   
   display: function(bIsVisible) {
      $("task_window").style.visibility = (bIsVisible ? "visible" : "hidden");   
   },
   getMarkUp: function () {
      var groupAjax = new GlideAjax('ScrumUserGroupsAjax');
      groupAjax.addParam('sysparm_name', 'getTeamInfo');
      groupAjax.addParam('sysparm_scrum_team_sysid', this.getScrumReleaseTeamSysId());
      groupAjax.getXML(this.generateMarkUp.bind(this));
   },
   generateMarkUp: function(response) {
      var mapTeamInfo = {};
      var teamData = response.responseXML.getElementsByTagName("team");
	  var strName, strSysId;
      for (var i = 0; i < teamData.length; i++) {
         strName = teamData[i].getAttribute("name");
         strSysId = teamData[i].getAttribute("sysid");
         mapTeamInfo[strName] = {
            name: strName,
            sysid: strSysId
         };
      }
   
      var arrTeamNames = [];
      for (var strTeamName in mapTeamInfo) {
         arrTeamNames.push (strTeamName + "");
      }
      arrTeamNames.sort ();
      var strMarkUp = "";
      if (arrTeamNames.length > 0) {
var strTable = "<div class='row'><div class='form-group'><label class='col-sm-3 control-label' for='teamId'>"+getMessage("Team")+"</label><span class='col-sm-9'><select class='form-control' id='teamId'>";
         for (var nSlot = 0; nSlot < arrTeamNames.length; ++nSlot) {
            strName = arrTeamNames[nSlot];
            strSysId = mapTeamInfo [strName].sysid;
strTable += "<option value='" + strSysId + "'>" + strName + "</option>";
         }
strTable += "</select></span></div></div>";
var strTable2 = "<div class='row' style='padding-top:10px;'><div id='memberId' class='col-sm-12'></div></div>";
      
         strMarkUp = "<div id='task_controls'>" + strTable + strTable2 +
                     "<div style='text-align:right;padding-top:20px;'>"+
"<button id='cancel' class='btn btn-default' type='button'>" + getMessage("Cancel") + "</button>"+
"&nbsp;&nbsp;<button id='ok' class='btn btn-primary' type='button'>" + getMessage("OK") + "</button>" +
"</div></div>";
      } else {
strMarkUp = "<div id='task_controls'><p>No release teams found</p>" +
                     "<div style='padding-top:20px;text-align:right;'>"+
"<button id='cancelNG' class='btn btn-default' type='button'>" + getMessage("Cancel") + "</button>"+
"&nbsp;&nbsp;<button id='okNG' class='btn btn-primary' type='button'>" + getMessage("OK") + "</button>" +
"</div></div>";
      }
      this._mstrDlg.setBody(strMarkUp, false, false);
      this.setUpEvents();
      this.display(true);
   },
   fillDataMap: function (mapData) {
      var strChosenTeamSysId = this.getUserChosenTeamSysIds ();
      if (strChosenTeamSysId) {
         mapData.sysparm_name = "createReleaseTeamMembers";
         mapData.sysparm_sys_id = this.getScrumReleaseTeamSysId ();
         mapData.sysparm_teams = strChosenTeamSysId;
         return true;
      } else {
         return false;
      }
   }
};
/*! RESOURCE: ActionLayoutItemColorHelper */
var ActionLayoutItemColorHelper = Class.create();
ActionLayoutItemColorHelper.prototype = {
    GROUP_TYPE_SPLIT_BUTTON: "1",
    COLUMN_NAME_COLOR: "color",
    COLUMN_NAME_VARIANT: "variant",
    BUTTON_OPTIONS: [{
            "value": "primary",
            "displayValue": "Primary"
        },
        {
            "value": "primary-positive",
            "displayValue": "Primary positive"
        },
        {
            "value": "primary-negative",
            "displayValue": "Primary negative"
        },
        {
            "value": "secondary",
            "displayValue": "Secondary"
        },
        {
            "value": "secondary-positive",
            "displayValue": "Secondary positive"
        },
        {
            "value": "secondary-negative",
            "displayValue": "Secondary negative"
        },
        {
            "value": "tertiary",
            "displayValue": "Tertiary"
        }
    ],
    MENU_OPTIONS: [{
            "value": "primary",
            "displayValue": "Primary"
        },
        {
            "value": "primary-selection",
            "displayValue": "Primary selection"
        },
        {
            "value": "secondary",
            "displayValue": "Secondary"
        },
        {
            "value": "secondary-selection",
            "displayValue": "Secondary selection"
        },
        {
            "value": "tertiary",
            "displayValue": "Tertiary"
        },
        {
            "value": "tertiary-selection",
            "displayValue": "Tertiary selection"
        }
    ],
    initialize: function() {},
    setButtonOptions: function(fieldName, initialValue) {
        g_form.clearOptions(fieldName);
        this.BUTTON_OPTIONS.forEach(option => {
            g_form.addOption(fieldName, option.value, option.displayValue);
        });
        if (initialValue && this.BUTTON_OPTIONS.find(option => option.value === initialValue)) {
            g_form.setValue(fieldName, initialValue);
        }
    },
    setDropdownOptions: function(fieldName, initialValue) {
        g_form.clearOptions(fieldName);
        this.MENU_OPTIONS.forEach(option => {
            g_form.addOption(fieldName, option.value, option.displayValue);
        });
        if (initialValue && this.MENU_OPTIONS.find(option => option.value === initialValue)) {
            g_form.setValue(fieldName, initialValue);
        }
    },
    loadVariantOptions: function(layoutItemSysId, initialValue) {
        var layoutItem = new GlideRecord("sys_ux_form_action_layout_item");
        layoutItem.get(layoutItemSysId);
        if (layoutItem.getValue("item_type") === "action") {
            this.setButtonOptions(this.COLUMN_NAME_VARIANT, initialValue);
        } else {
            var layoutGroup = new GlideRecord('sys_ux_form_action_layout_group');
            layoutGroup.get(layoutItem.getValue("layout_group"));
            if (layoutGroup.getValue("type") === this.GROUP_TYPE_SPLIT_BUTTON) {
                this.setButtonOptions(this.COLUMN_NAME_VARIANT, initialValue);
            } else {
                this.setDropdownOptions(this.COLUMN_NAME_VARIANT, initialValue);
            }
        }
    },
    loadColorOptions: function(initialValue) {
        if (g_form.getValue("item_type") === "action") {
            this.setButtonOptions(this.COLUMN_NAME_COLOR, initialValue);
        } else {
            var gr = new GlideRecord('sys_ux_form_action_layout_group');
            gr.get(g_form.getValue("layout_group"));
            if (gr.getValue("type") === this.GROUP_TYPE_SPLIT_BUTTON) {
                this.setButtonOptions(this.COLUMN_NAME_COLOR, initialValue);
            } else {
                this.setDropdownOptions(this.COLUMN_NAME_COLOR, initialValue);
            }
        }
    },
    handleActionItemTypeChange: function(itemType) {
        if (itemType === "action") {
            this.setButtonOptions(this.COLUMN_NAME_COLOR);
        }
		if (itemType === "group") {
            g_form.clearOptions(this.COLUMN_NAME_COLOR);
        }
    },
    handleActionItemGroupChange: function(layoutGroupSysId) {
        var gr = new GlideRecord('sys_ux_form_action_layout_group');
        gr.get(layoutGroupSysId);
        if (gr.getValue("type") === this.GROUP_TYPE_SPLIT_BUTTON) {
            this.setButtonOptions(this.COLUMN_NAME_COLOR);
        } else {
            this.setDropdownOptions(this.COLUMN_NAME_COLOR);
        }
    },
    type: "ActionLayoutItemColorHelper"
};
/*! RESOURCE: /scripts/lib/jquery/jquery_clean.js */
(function() {
	if (!window.jQuery)
		return;
	if (!window.$j_glide)
		window.$j = jQuery.noConflict();
	if (window.$j_glide && jQuery != window.$j_glide) {
		if (window.$j_glide)
		jQuery.noConflict(true);
		window.$j = window.$j_glide;
	}
})();
;
;
