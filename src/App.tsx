import { useState } from 'react'
import { jsonToTOON, type TOONOptions } from './utils/toonConverter'
import { countTokens } from './utils/tokenCounter'
import './App.css'

const defaultJSON = `{
  "shopping_cart": [
    { "id": "GDKVEG984", "name": "iPhone 15 Pro Max", "quantity": 2, "price": 1499.99, "category": "Electronics" },
    { "id": "GDKVEG985", "name": "Samsung Galaxy S24 Ultra", "quantity": 1, "price": 1299.99, "category": "Electronics" },
    { "id": "GDKVEG986", "name": "Apple Watch Series 9", "quantity": 1, "price": 199.99, "category": "Electronics" },
    { "id": "GDKVEG987", "name": "MacBook Pro 16-inch", "quantity": 1, "price": 2499.99, "category": "Electronics" }
  ]
}`;

function App() {
  const [jsonInput, setJsonInput] = useState('');
  const [toonOutput, setToonOutput] = useState('');
  const [delimiter, setDelimiter] = useState(',');
  const [indentation, setIndentation] = useState(' ');
  const [showLengthMarkers, setShowLengthMarkers] = useState(true);
  const [error, setError] = useState('');
  const [jsonTokens, setJsonTokens] = useState(0);
  const [toonTokens, setToonTokens] = useState(0);

  const handleConvert = () => {
    try {
      setError('');
      const options: TOONOptions = {
        delimiter,
        indentation,
        showLengthMarkers,
      };
      
      // Format JSON first to ensure proper counting
      const formatted = JSON.stringify(JSON.parse(jsonInput), null, 2);
      const result = jsonToTOON(jsonInput, options);
      
      setToonOutput(result);
      setJsonTokens(countTokens(formatted));
      setToonTokens(countTokens(result));
    } catch {
      setError('Invalid JSON. Please check your input.');
      setToonOutput('');
      setJsonTokens(0);
      setToonTokens(0);
    }
  };

  const savedPercentage = jsonTokens > 0 
    ? Math.round(((jsonTokens - toonTokens) / jsonTokens) * 100)
    : 0;

  const handleLoadExample = () => {
    setJsonInput(defaultJSON);
    setError('');
  };

  const handleClearAll = () => {
    setJsonInput('');
    setToonOutput('');
    setError('');
    setJsonTokens(0);
    setToonTokens(0);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(toonOutput);
      // You could add a toast notification here
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleDownload = () => {
    const blob = new Blob([toonOutput], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'output.toon';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  return (
    <div className="min-h-screen bg-linear-to-br from-slate-900 via-purple-900 to-slate-900 p-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-2">🎒 ToonKit</h1>
          <p className="text-purple-300 text-lg">JSON to TOON Converter</p>
          <p className="text-slate-400 text-sm mt-2">Token-Oriented Object Notation for LLMs</p>
        </div>

        {/* Options Panel */}
        <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 mb-6 border border-white/20">
          <h2 className="text-white text-xl font-semibold mb-4">⚙️ Options</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Delimiter
              </label>
              <input
                type="text"
                value={delimiter}
                onChange={(e) => setDelimiter(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
                placeholder=","
                maxLength={1}
              />
            </div>
            
            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Indentation
              </label>
              <select
                value={indentation}
                onChange={(e) => setIndentation(e.target.value)}
                className="w-full px-4 py-2 bg-white/5 border border-white/20 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-purple-500"
              >
                <option value=" ">1 space</option>
                <option value="  ">2 spaces</option>
                <option value="    ">4 spaces</option>
                <option value="\t">Tab</option>
              </select>
            </div>

            <div>
              <label className="block text-purple-200 text-sm font-medium mb-2">
                Options
              </label>
              <label className="flex items-center space-x-3 cursor-pointer px-4 py-2">
                <input
                  type="checkbox"
                  checked={showLengthMarkers}
                  onChange={(e) => setShowLengthMarkers(e.target.checked)}
                  className="w-5 h-5 rounded border-white/20 bg-white/5 checked:bg-purple-500 focus:ring-2 focus:ring-purple-500"
                />
                <span className="text-white font-medium">Show Length Markers [#]</span>
              </label>
            </div>
          </div>

          <button
            onClick={handleConvert}
            className="mt-6 w-full bg-linear-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-[1.02] focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-900"
          >
            🚀 Convert to TOON
          </button>
        </div>

        {error && (
          <div className="bg-red-500/20 border border-red-500/50 rounded-xl p-4 mb-6">
            <p className="text-red-200">{error}</p>
          </div>
        )}

        {/* Editor Panels */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
          {/* JSON Input */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-semibold">📝 JSON Input</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleLoadExample}
                  className="px-3 py-1.5 bg-blue-500/20 hover:bg-blue-500/30 border border-blue-500/50 text-blue-200 text-sm font-medium rounded-lg transition-colors"
                >
                  Load Example
                </button>
                <button
                  onClick={handleClearAll}
                  className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/30 border border-red-500/50 text-red-200 text-sm font-medium rounded-lg transition-colors"
                >
                  Clear All
                </button>
              </div>
            </div>
            <textarea
              value={jsonInput}
              onChange={(e) => setJsonInput(e.target.value)}
              className="w-full h-96 px-4 py-3 bg-slate-900/50 border border-white/20 rounded-lg text-white font-mono text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
              placeholder="Paste your JSON here..."
            />
          </div>

          {/* TOON Output */}
          <div className="bg-white/10 backdrop-blur-lg rounded-xl p-6 border border-white/20">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-white text-xl font-semibold">✨ TOON Output</h2>
              <div className="flex gap-2">
                <button
                  onClick={handleCopy}
                  disabled={!toonOutput}
                  className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/30 border border-green-500/50 text-green-200 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Copy
                </button>
                <button
                  onClick={handleDownload}
                  disabled={!toonOutput}
                  className="px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 border border-purple-500/50 text-purple-200 text-sm font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Download
                </button>
              </div>
            </div>
            <textarea
              value={toonOutput}
              readOnly
              className="w-full h-96 px-4 py-3 bg-slate-900/50 border border-white/20 rounded-lg text-green-300 font-mono text-sm focus:outline-none resize-none"
              placeholder="TOON output will appear here..."
            />
          </div>
        </div>

        {/* Results Panel */}
        {toonOutput && (
          <div className="bg-linear-to-r from-purple-500/20 to-pink-500/20 backdrop-blur-lg rounded-xl p-6 border border-purple-500/30">
            <h2 className="text-white text-xl font-semibold mb-4">📊 Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-purple-200 text-sm font-medium mb-1">JSON Tokens</div>
                <div className="text-white text-3xl font-bold">{jsonTokens}</div>
              </div>
              
              <div className="bg-white/5 rounded-lg p-4 border border-white/10">
                <div className="text-purple-200 text-sm font-medium mb-1">TOON Tokens</div>
                <div className="text-white text-3xl font-bold">{toonTokens}</div>
              </div>
              
              <div className="bg-linear-to-br from-green-500/20 to-emerald-500/20 rounded-lg p-4 border border-green-500/30">
                <div className="text-green-200 text-sm font-medium mb-1">Saved</div>
                <div className="text-white text-3xl font-bold">
                  {savedPercentage}%
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="text-center mt-8 text-slate-400 text-sm space-y-2">
          <p>Token-Oriented Object Notation • Compact & LLM-friendly</p>
          <div className="flex items-center justify-center gap-2 text-xs">
            <span>Built with ❤️ by</span>
            <a 
              href="https://github.com/hzeghari" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 font-semibold transition-colors"
            >
              @hzeghari
            </a>
            <span>•</span>
            <a 
              href="https://github.com/hzeghari/toonkit" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-purple-400 hover:text-purple-300 transition-colors flex items-center gap-1"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                <path fillRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" clipRule="evenodd" />
              </svg>
              Star on GitHub
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
