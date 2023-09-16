function searchWord() {
     const word = document.getElementById("wordInput").value;
     if (!word) {
         alert("Please enter a word.");
         return;
     }
 
     const apiUrl = `https://api.dictionaryapi.dev/api/v2/entries/en/${word}`;
 
     fetch(apiUrl)
         .then(response => response.json())
         .then(data => {
             const meanings = document.getElementById("meaning");
             const synonyms = document.getElementById("synonym");
             const antonyms = document.getElementById("antonym");
 
             // Clear previous data
             meanings.textContent = "";
             synonyms.textContent = "";
             antonyms.textContent = "";
 
             if (data.length > 0) {
                 const firstEntry = data[0];
                 if (firstEntry.meanings) {
                     firstEntry.meanings.forEach(meaning => {
                         meanings.textContent += `${meaning.definitions[0].definition}\n`;
                         if (meaning.synonyms) {
                             synonyms.textContent += `${meaning.synonyms.join(", ")}\n`;
                         }
                         if (meaning.antonyms) {
                             antonyms.textContent += `${meaning.antonyms.join(", ")}\n`;
                         }
                     });
                 }
             } else {
                 meanings.textContent = "No data found for this word.";
             }
         })
         .catch(error => {
             console.error(error);
             alert("An error occurred while fetching data.");
         });
 }