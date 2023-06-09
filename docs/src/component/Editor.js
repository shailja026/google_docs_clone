import React, { useEffect, useState } from 'react'
import { Box } from "@mui/material"
import styled from '@emotion/styled'
import Quill from "quill"
import "quill/dist/quill.snow.css"
import "./Editor.css"
import { Socket, io } from "socket.io-client";
import { useParams } from 'react-router-dom'

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];


const Component = styled.div`
  bacground : "whiteSmock"
 `

function Editor() {
    const [socket, setSocket] = useState();
    const [quill, setQuill] = useState();
    const {id} = useParams();


    useEffect(() => {
        const serverFromQuill = new Quill("#container", { theme: "snow", modules: { toolbar: toolbarOptions } });
         serverFromQuill.disable()
         serverFromQuill.setText("loading..")
        setQuill(serverFromQuill);
         

    }, []);

    // when component did mount we have just set the server
    useEffect(() => {
        const socketServer = io("http://localhost:9000");
        setSocket(socketServer);
        // retrun will basically disconnect the server when we will close the serrver
        return () => {
            socketServer.disconnect();
        }
    }, [])

    useEffect(() => {
        if (socket === null || quill === null) return;

        const handleChnage = (delta, oldData, source) => {
            if (source !== "user") return;
            socket && socket.emit("send-change", delta)
        }

        quill && quill.on("text-change", handleChnage);
        return () => {
            quill && quill.off("text-change", handleChnage);
        }

    }, [quill, socket])

    useEffect(() => {
        if (socket === null || quill === null) return;

        const handleChnage = (delta) => {
            
           quill.updateContents(delta)
        }

        socket && socket.on("recieve-changes", handleChnage);
        return () => {
            socket && socket.off("text-change", handleChnage);
        }

    }, [quill, socket])

    useEffect(()=>{
        if(quill === null || socket === null) return;
        socket && socket.once("load-document" , document => {
            quill && quill.setContents(document);
            quill && quill.enable();
        })
        socket && socket.emit("get-document",id);

    },[quill,socket,id])
    
    useEffect(()=>{
        if(socket === null || quill === null) return ;
      const interval =   setInterval(()=> {
            socket.emit("save-document" , quill.getContents())
        },1000)

        return () => {
            clearInterval(interval);
        }

    },[socket,quill])


    return (


        <Component>
            <Box id="container" className="box">@add documents</Box>
        </Component>
    )



    
}

export default Editor