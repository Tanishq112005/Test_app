import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../redux_state_manegemet/store";
import { useRef } from "react";
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';


function Editor_page(){
  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const lang = useSelector((s: RootState) => s.lang.value);
  const template = useSelector((s: RootState) => s.template.value);
  const question_is_on = useSelector((s: RootState) => s.question_is_on.value);
  const question_count = useSelector((s: RootState) => s.question.value);
  const files = useSelector((s: RootState) => s.files.value);
  const currentQuestionIndex = question_is_on - 1;

  const currentFile = files[currentQuestionIndex];

    

    return <Editor
      key={`${currentFile.name}-${currentFile.language}`}
      height="90vh"
      path={currentFile.name}
      language={currentFile.language}
      value={currentFile.value}
      onMount={(editor) => { editorRef.current = editor; }}
      options={{
        readOnly : true ,
        selectOnLineNumbers : true ,
        minimap : {
          enabled : false,
        }

      }}
      >
   
      </Editor>
}

export default Editor_page ; 


