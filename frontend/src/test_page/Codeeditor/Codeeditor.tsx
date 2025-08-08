import React, { useEffect, useRef } from 'react';
import Editor from '@monaco-editor/react';
import * as monaco from 'monaco-editor';
import { useDispatch, useSelector } from 'react-redux';
import { type AppDispatch, type RootState } from '../../redux_state_manegemet/store';
import { setFiles, updateFile, type FileState } from '../../redux_state_manegemet/files';


const createInitialFiles = (question_number: number): FileState[] => {
  const initialFiles: FileState[] = [];
  for (let i = 0; i < question_number; i++) {
    initialFiles.push({
      name: `q${i + 1}`,
      language: 'cpp',
      value: `#include<bits/stdc++.h>
using namespace std;

int main() {
    // write your code from here 
    return 0; 
}`,
    });
  }
  return initialFiles;
};


export default function MonacoEditorComponent() {

  const editorRef = useRef<monaco.editor.IStandaloneCodeEditor | null>(null);
  const dispatch = useDispatch<AppDispatch>();

  const lang = useSelector((s: RootState) => s.lang.value);
  const template = useSelector((s: RootState) => s.template.value);
  const question_is_on = useSelector((s: RootState) => s.question_is_on.value);
  const question_count = useSelector((s: RootState) => s.question.value);
  const files = useSelector((s: RootState) => s.files.value);

  const currentQuestionIndex = question_is_on - 1;


  useEffect(() => {
    if (question_count > 0 && files.length === 0) {
      const initialFiles = createInitialFiles(question_count);
      dispatch(setFiles(initialFiles));
    }
  }, [question_count, files.length, dispatch]);

  const handleEditorChange = (value: string | undefined) => {
    if (value === undefined) return;
    dispatch(updateFile({ index: currentQuestionIndex, newContent: { value } }));
  };

  useEffect(() => {
    if (typeof template === 'string' && template.length > 0 && files.length > 0) {
      dispatch(updateFile({ index: currentQuestionIndex, newContent: { value: template } }));
    }
  }, [template, dispatch]);

  useEffect(() => {
    const currentFile = files[currentQuestionIndex];
    if (!currentFile || currentFile.language === lang) return;
    dispatch(updateFile({ index: currentQuestionIndex, newContent: { language: lang } }));
  }, [lang, currentQuestionIndex, files, dispatch]);


  useEffect(() => {
    const editor = editorRef.current;

    if (editor) {
    
      const disposable = editor.onDidChangeCursorPosition((e) => {
        editor.revealPositionInCenter(e.position);
      });

    
      return () => {
        disposable.dispose();
      };
    }
  
  }, [editorRef.current]); 



  const currentFile = files[currentQuestionIndex];

  if (!currentFile) {
    return <div>Initializing questions...</div>;
  }

  return (
    <div style={{ height: '100%', width: '100%' }}>
      <div className="editor-wrapper">
        <Editor
          key={`${currentFile.name}-${currentFile.language}`}
          height="90vh"
          theme="vs-dark"
          path={currentFile.name}
          language={currentFile.language}
          value={currentFile.value}
          onMount={(editor) => { editorRef.current = editor; }}
          onChange={handleEditorChange}
          options={{
            minimap: { enabled: false },
            scrollBeyondLastLine: true,
          }}
        />
      </div>
    </div>
  );
}