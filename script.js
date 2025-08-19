const stopwords = new Set(['a','o','as','os','e','é','de','do','da','em','que','para','com','um','uma','no','na','por','se','ao','dos','das','como','mais']);
function limparTexto(s){
  return s.normalize('NFD').replace(/[^\p{L}\s\d]/gu, '').toLowerCase();
}
function contarPalavras(text, removeCommon = true){
  const clean = limparTexto(text);
  const parts = clean.split(/\s+/).filter(Boolean);
  const freq = new Map();
  for(const w of parts){
    if(removeCommon && stopwords.has(w)) continue;
    freq.set(w, (freq.get(w) || 0) + 1);
  }
  return Array.from(freq.entries()).map(([word,count])=>({word,count}));
}
function analisar(){
  const text = document.getElementById('inputText').value;
  const limit = Math.max(1, Number(document.getElementById('limit').value)||10);
  const removeCommon = document.getElementById('removeStop').checked;
  const lista = contarPalavras(text, removeCommon);
  lista.sort((a,b)=> b.count - a.count || a.word.localeCompare(b.word));
  const results = document.getElementById('results');
  results.innerHTML = '';
  const sliced = lista.slice(0, limit);
  for(const item of sliced){
    const li = document.createElement('li');
    li.textContent = `${item.word} — ${item.count}`;
    results.appendChild(li);
  }
}