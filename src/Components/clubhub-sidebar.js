import React from "react";
import pic from "../assets/Document.png";
import "../styles/font.css"
import {Logger} from 'logging-library'
import FileViewer from 'react-file-viewer';
import { CustomErrorComponent } from 'custom-error';
import axios from '../axios';
//import DocViewer from "react-doc-viewer";
import DocViewer, { DocViewerRenderers } from "react-doc-viewer";

export default function ClubhubSidebar(props) {
  let ext, type
  let file = process.env.REACT_APP_API+"/"+props.value.name
  let name = props.value.name
    if (name){
      ext = name.toString().split(".")
      type = ext.pop()
      
      //console.log("filename",ext.pop())
    }

    const docs = [
      { uri: file },
    ];

  console.log("file",file,"ext",type)
  

  const onError = (e) => {
    Logger.logError(e, 'error in file-viewer');
  }
 
  return (
    <div >
      {/* Parent Profile Card */}
      <div className="">
        <h2 className="self-center font-lexend text-lg font-medium whitespace-nowrap text-white ml-7 mt-8 ">
          File Preview
          {console.log("preview",file)}
        </h2>

        <DocViewer pluginRenderers={DocViewerRenderers} documents={docs} />

        {/* <DocViewer documents={docs} /> */}

        {/* {props.value.name && <FileViewer
        fileType={type}
        filePath={file}
        errorComponent={CustomErrorComponent}
        onError={onError}/>} */}









        {/* <object 
                className="flex grow-0 rounded-[10px] m-2 bg-[#212121] pr-30"
                data="../../abc.pdf" 
                type="application/pdf" width="100%" height="100%">
                <p>Alternative text - include a link 
                    <a href="../abc.pdf" >
                    to the PDF!</a>
                </p>
        </object> */}
        <div className="flex">
            <div className="flex-1">
            <p className="self-center font-lexend text-lg font-medium whitespace-nowrap text-white ml-7 mt-4 ">
            {props.value.name}
            </p>
            <p className="text-white font-lexend ml-7 font-[16px]">file size : {props.value.size}</p>
            </div>
            <div className="flex-1 grow-0 mt-6">
                <svg width="21" height="25" viewBox="0 0 21 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M2.1 22.2284C2.1 23.753 3.35987 25 4.90002 25H16.1C17.6401 25 18.9 23.753 18.9 22.2284V6.25H2.1V22.2284ZM21 2.08333H15.75L13.9922 0H7.00783L5.25 2.08333H0V4.16667H21V2.08333Z" fill="#FF0000"/>
                </svg>

            </div>
        
        </div>
        <hr className="mt-5"/>
        </div>
    </div>
  );
}
