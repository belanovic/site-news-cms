import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react'


export default function TextEditor({text, setText, initialText}) {
   const editorRef = useRef(null);
   const log = () => {
     if (editorRef.current) {
       console.log(editorRef.current.getContent());
       setText(editorRef.current.getContent())
     }
   };
   return (
     <div className = "article-text-editor">
       <Editor
         apiKey='k10ugi99nbqf3vnnmg9v5jbab20edd17l0663x8zqtdz04nl'
         onInit={(evt, editor) => editorRef.current = editor}
         initialValue = {initialText}
         onEditorChange= {log}
         init={{
           height: '75vh',
           auto_focus : "itinymce",
           menubar: false,
           paste_data_images: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount'
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help' + 
           'media',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
           selector: 'textarea',
           plugins: 'media',
           menubar: 'insert'
           
         }}
       />
       {/* <button onClick={log}>Log editor content</button> */}
      </div>
   );
 }
