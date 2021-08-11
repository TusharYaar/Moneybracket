import Languages from "../languages/languages";
export const translateAppText =(language="en", key) =>  {
    return Languages[language].translations[key]
}
export const getFont = (language="en",type="reglar") => {
    return Languages[language].fonts[type];

}