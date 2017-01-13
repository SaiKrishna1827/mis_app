/**
 * @Rajat Bajaj
**/

//route for setting end points
var attendance = require('express').Router();
var attendanceModel = require('models/attendance');
var Session = require('config/session');


attendance.get('/sessionyear',function(req,res){
	var session = new Session(req.query.access_token,function(err,result){
		if(err)
		{
			res.status(401);
			res.json({
				"status":401,
				"err_code":8,
				"err_msg":'some problem in session'
			});
		}
	});
	var adm_no = session.getId();
	attendanceModel.getSessionYear(adm_no,function(err,result){
		if(err)
		{
			res.status(401);
			res.json({
				"success":false,
				"err_msg":err.message
			});
		}
		else
		res.json(result);
	});
});

attendance.get('/semester',function(req,res){
	var session = new Session(req.query.access_token,function(err,result){
		if(err)
		{
			res.status(401);
			res.json({
				"status":401,
				"err_code":8,
				"err_msg":'some problem in session'
			});
		}
	});
	var adm_no = session.getId();
	attendanceModel.getSemester(adm_no,req.query.sessionyear,req.query.session,function(err,result){
		if(err)
		{
			res.status(401);
			res.json({
				"success":false,
				"err_msg":err.message
			});
		}
		else
		res.json(result);
	});
});

attendance.get('/subjectlist',function(req,res){
	var session = new Session(req.query.access_token,function(err,result){
		if(err)
		{
			res.status(401);
			res.json({
				"status":401,
				"err_code":8,
				"err_msg":'some problem in session'
			});
		}
	});
	var adm_no = session.getId();
	var data = {};
	data['adm_no'] = adm_no;
	data['session'] = req.query.session;
	data['session_year'] = req.query.sessionyear;
	data['semester'] = req.query.semester;
	attendanceModel.getSubjectList(data,function(err,result){
		if(err)
		{
			res.status(401);
			res.json({
				"success":false,
				"err_msg":err.message
			});
		}
		else
		{
			res.json({
				"success":true,
				"subjectlist":result
			});
		}
		
	});
});


attendance.get('/studentattandence',function(req,res){
	var session = new Session(req.query.access_token,function(err,result){
		if(err)
		{
			res.status(401);
			res.json({
				"status":401,
				"err_code":8,
				"err_msg":'some problem in session'
			});
		}
	});
	var adm_no = session.getId();
	var data = {};
	data['adm_no'] = adm_no;
	data['session'] = req.query.session;
	data['session_year'] = req.query.sessionyear;
	data['semester'] = req.query.semester;
	attendanceModel.getAttendanceDetails(data,function(err,result){
		if(err)
		{
			res.status(401);
			res.json({
				"success":false,
				"err_msg":err.message
			});
		}
		else
		{
			res.json({
				"success":true,
				"attendance":result
			});
		}	
	});
});

module.exports = attendance;