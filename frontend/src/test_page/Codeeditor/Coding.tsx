import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type AppDispatch, type RootState } from "../../redux_state_manegemet/store";
import { code_val_type } from "../../redux_state_manegemet/code_val";
import { template_type } from "../../redux_state_manegemet/template";
import { lang_type } from "../../redux_state_manegemet/lang";


const LANGUAGES = [
    {
        name: "C++", 
        id: "cpp",    
        code: 53,
        template: `#include<bits/stdc++.h>
using namespace std;

int main() {
    // write your code from here 
    return 0; 
}`
    },
    {
        name: "C",
        id: "c",
        code: 47,
        template: `#include<stdio.h>
#include<conio.h>

int main() {
    // write your code from here 
    return 0;
}`
    }
];

function Coading_language() {
    const dispatch = useDispatch<AppDispatch>();
    const [showPopup, setShowPopup] = useState(false);
    const [lang , setlang] = useState("") ; 
    const val = useSelector((s : RootState) => s.lang.value) ; 
    useEffect(() => {
        setlang(val === 'cpp' ? 'C++' : 'Select Language');
    } , []) ; 
     
    const handleLanguageSelect = (language : any) => {
   
        dispatch(lang_type(language.id));
        dispatch(template_type(language.template));
        dispatch(code_val_type(language.code));
        setlang(language.name)
        setShowPopup(false); 
    };

    return (
        <div className="editor-container">
        <button className="select-btn" onClick={() => setShowPopup(!showPopup)}>
           {lang}
        </button>

        {showPopup && (
            <ul className="lang-list">
                {LANGUAGES.map((language) => (
                    <li key={language.id}>
                        <button onClick={() => handleLanguageSelect(language)}>
                            {language.name}
                        </button>
                    </li>
                ))}
            </ul>
        )}
    </div>
    );
}

export default Coading_language;