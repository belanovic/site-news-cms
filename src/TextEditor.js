import React, { useState, useRef } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import './style/text-editor.css';


export default function TextEditor({text, setText, initialText}) {
   const editorRef = useRef(null);
   const log = () => {
     if (editorRef.current) {
       /* console.log(editorRef.current.getContent()); */
       setText(editorRef.current.getContent())
     }
   };
   return (
     <div className = "article-text-editor">
       <Editor
         apiKey='k10ugi99nbqf3vnnmg9v5jbab20edd17l0663x8zqtdz04nl'
         onInit={(evt, editor) => editorRef.current = editor}
         /* content_css = './style/text-editor.css' */
         /* body_class = 'body' */
         /* content_style = '.body { margin: 10px; border: 55px solid red; padding: 93px; }' */
         /* importcss_append = {true} */
         

         
         initialValue = {initialText}
         onEditorChange= {log}
         image_dimensions = {true}
         init={{
           selector: 'textarea#image-tools',
           height: '75vh',
           auto_focus : "itinymce",
           paste_data_images: true,
           plugins: [
             'advlist autolink lists link image charmap print preview anchor',
             'searchreplace visualblocks code fullscreen',
             'insertdatetime media table paste code help wordcount imagetools'
            
           ],
           toolbar: 'undo redo | formatselect | ' +
           'bold italic backcolor | alignleft aligncenter ' +
           'alignright alignjustify | bullist numlist outdent indent | ' +
           'removeformat | help' + 
           'media' + 
           'insertfile undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
           content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:16px }',
         /*   image_class_list: [
            {title: 'fotka1', value: 'fotka-klasa'}
          ] */

          
           
         }}
       />
       {/* <button onClick={log}>Log editor content</button> */}
      </div>
   );
 }
