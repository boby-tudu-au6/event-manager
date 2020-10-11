// const User = require('../models/userModel')
import User from '../models/userModel'
import Event from '../models/eventModel'
import server from './index'
import jwt from 'jsonwebtoken'
// const server = require('./index')
// const jwt = require("jsonwebtoken")


 
// websocket functions
const io = require('socket.io')(server);

io.on('connection', socket => {
	// connection message
	console.log(`made socket connection at ${socket.id}`)

	// login method
  socket.on("login",async ({name,pass})=>{
	  
		try{
			const user = await User.findOne({name,pass})
			if(user===null){
				const newuser = await User.create({name,pass,
					isAdmin:(name==='0000' && pass==='0000'?"true":"false")})
				var token = jwt.sign({ user:newuser }, 'secret');
				return socket.emit('login',{status:"ok",token,isAdmin:newuser.isAdmin})
			}
			var token = jwt.sign({ user:user }, 'secret');
			socket.emit('login',{status:"ok",token,isAdmin:user.isAdmin})
		}catch(err){
			console.log(err.message)
			socket.emit('login',{status:'failed',message:err.message})
		}
  })

//   checklogin
  socket.on("checklogin",async ({token,admin})=>{
	try{
		let decoded = jwt.verify(token, 'secret')
		if(decoded.user!==undefined && decoded.user.isAdmin===admin){
			const user = await User.findOne({_id:decoded.user._id})
			return socket.emit('checklogin',{status:'ok',...user})
		}
		return socket.emit('checklogin',{status:'failed',msg:"invalid token"})
	}catch(err){
		return socket.emit('checklogin',{status:'failed',msg:err.message})
	}
  })

  socket.on('addevent',async ({Data,token})=>{
	//   console.log(data)
	  try{
		  const user = jwt.verify(token,'secret')
		  const event = await Event.create({
			...Data,owner:user.user._id
		  })
		  return socket.emit('addevent',{status:'ok',event})
	  }catch(err){
		  return socket.emit('addevent',{status:"failed",msg:err.message})
	  }
  })
  socket.on('getevent',async ({token})=>{
	  try{
		  console.log('get event fired')
		  let user = jwt.verify(token,'secret')
		  if(user.user.name!==undefined){
			  	const events = await Event.find({owner:user.user._id})
				return socket.emit('getevent',{status:'ok',events})
		  }else{
			return socket.emit('getevent',{status:'failed',user})
		  }
	  }catch(err){
		return socket.emit('getevent',
		{status:'failed',err:err.message})
	  }
  })

  socket.on('getallevent',async ({token})=>{
	  try{
		const {user} = jwt.verify(token,'secret')
		if(user.isAdmin==='true'){
			const events = await Event.find().populate('owner')
			return socket.emit('getallevent',{status:"ok",events})
		}else{
			socket.emit('getallevent',{status:"failed",msg:"invalid token"})
		}
	  }catch(err){
		  return socket.emit('getallevent',{status:"failed",msg:err.message})
	  }
  })

  socket.on("update",async ({_id,Subject})=>{
	try{
		console.log({_id,Subject})
		await Event.updateOne({_id},{Subject})
		console.log('udpate success')
		return socket.emit('update',{status:"ok",msg:"udpate success"})
	}catch(err){
		return socket.emit('udpate',{status:"failed",msg:err.message})
	}
  })

  socket.on('delete',async ({id})=>{
	try{
		await Event.deleteOne({_id:id})
		return socket.emit('delete',{status:"ok",msg:"delete success"})
	}catch(err){
		return socket.emit('delete',{status:"failed",msg:err.message})
	}
  })


});

module.exports = io