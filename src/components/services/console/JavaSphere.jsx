import React, { useEffect, useRef, useState } from "react";

import Typed from "typed.js";

const JavaCompilationAnimation = () => {
  const terminalContentRef = useRef(null);
  const [animationComplete, setAnimationComplete] = useState(false);

  useEffect(() => {
    
    runAnimationSequence();
    
    
    return () => {
     
    };
  }, []);

  
  const createLine = (className = "") => {
    const line = document.createElement("div");
    if (className) line.className = className;
    terminalContentRef.current.appendChild(line);
    return line;
  };

  
  const createPromptLine = () => {
    const line = createLine();
    const prompt = document.createElement("span");
    prompt.className = "prompt";
    prompt.textContent = "user@javac:~$ ";
    line.appendChild(prompt);
    return line;
  };

  
  const scrollToBottom = () => {
    if (terminalContentRef.current) {
      terminalContentRef.current.scrollTop = terminalContentRef.current.scrollHeight;
    }
  };

  const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

 
  const typeInElement = async (element, text, className) => {
    const span = document.createElement("span");
    span.className = className;
    element.appendChild(span);

    return new Promise(resolve => {
      new Typed(span, {
        strings: [text],
        typeSpeed: 40,
        showCursor: false,
        onComplete: resolve
      });
      scrollToBottom();
    });
  };

  
  const runAnimationSequence = async () => {
    if (!terminalContentRef.current) return;

   
    let line = createPromptLine();
    await typeInElement(line, "vim HelloWorld.java", "command");

    
    const javaCode = `
// Simple Java program to demonstrate compilation
public class HelloWorld {
    public static void main(String[] args) {
        // Print a welcome message
        System.out.println("Hello, World!");
        
        // Calculate and print the sum of numbers from 1 to 5
        int sum = 0;
        for(int i = 1; i <= 5; i++) {
            sum += i;
            System.out.println("Adding " + i + ": Sum is now " + sum);
        }
        
        System.out.println("Final sum: " + sum);
    }
}`;

   
    const javaCodeLine = createLine("code-block java-code");
    await typeCodeWithHighlighting(javaCodeLine, javaCode);
    
    
    line = createPromptLine();
    await typeInElement(line, ":wq", "command");

   
    line = createPromptLine();
    await typeInElement(line, "javac HelloWorld.java", "command");

   
    line = createLine();
    await typeInElement(line, "Compiling...", "compile-message");
    
    
    const compilingLine = line;
    const cursor = document.createElement("span");
    cursor.className = "cursor blink";
    cursor.textContent = "█";
    compilingLine.appendChild(cursor);
    
   
    await sleep(2000);
    
    
    compilingLine.removeChild(cursor);
    
    
    line = createLine();
    await typeInElement(line, "Compilation successful!", "success");
    
   
    line = createPromptLine();
    await typeInElement(line, "java HelloWorld", "command");
    
  
    const outputs = [
      "Hello, World!",
      "Adding 1: Sum is now 1",
      "Adding 2: Sum is now 3",
      "Adding 3: Sum is now 6",
      "Adding 4: Sum is now 10",
      "Adding 5: Sum is now 15",
      "Final sum: 15"
    ];
    
    for (const output of outputs) {
      line = createLine();
      await typeInElement(line, output, "output");
      await sleep(300);
    }
    
   
    line = createPromptLine();
    const finalCursor = document.createElement("span");
    finalCursor.className = "cursor blink";
    finalCursor.textContent = "█";
    line.appendChild(finalCursor);
    
    setAnimationComplete(true);
    
    
    setTimeout(() => {
      if (terminalContentRef.current) {
        terminalContentRef.current.innerHTML = "";
        runAnimationSequence();
      }
    }, 5000);
  };

  
  const typeCodeWithHighlighting = async (element, code) => {
    
    const lines = code.trim().split("\n");
    
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      const lineElement = document.createElement("div");
      element.appendChild(lineElement);
      
      
      const highlightedLine = highlightJavaSyntax(line);
      await typeLine(lineElement, highlightedLine);
      
     
      if (i < lines.length - 1) {
        await sleep(100);
      }
      
      scrollToBottom();
    }
  };
  
  
  const highlightJavaSyntax = (line) => {
    
    let highlighted = line
      
      .replace(/(\/\/.*$)/g, '<span class="comment">$1</span>')
     
      .replace(/\b(public|class|static|void|int|for|if|else|return)\b/g, '<span class="keyword">$1</span>')
      
      .replace(/\b(System\.out\.println)\(/g, '<span class="method">$1</span>(')
     
      .replace(/"([^"]*)"/g, '<span class="string">"$1"</span>');
      
    return highlighted;
  };
  
  
  const typeLine = (element, html) => {
    return new Promise(resolve => {
      const typed = new Typed(element, {
        strings: [html],
        typeSpeed: 20,
        showCursor: false,
        contentType: 'html',
        onComplete: resolve
      });
    });
  };

  return (
    <div className="terminal-container">
      <div className="terminal">
        <div className="terminal-header">
          <div className="terminal-title">Java Compilation Terminal</div>
          <div className="terminal-controls">
            <div className="terminal-button terminal-button-red"></div>
            <div className="terminal-button terminal-button-yellow"></div>
            <div className="terminal-button terminal-button-green"></div>
          </div>
        </div>
        <div className="terminal-content" ref={terminalContentRef}></div>
      </div>
    </div>
  );
};

const JavaCompilationStyles = () => {
  return (
    <style jsx>{`
      .terminal-container {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 100%;
        min-height: 500px;
        padding: 20px;
        /* Removed background color to make transparent */
        font-family: 'Courier New', monospace;
      }
      
      .terminal {
        /* Changed to semi-transparent background */
        background-color: rgba(40, 40, 40, 0.75);
        width: 700px;
        height: 500px;
        border-radius: 8px;
        padding: 0;
        overflow: hidden;
        position: relative;
        box-shadow: 0 0 20px rgba(0, 0, 0, 0.3);
        display: flex;
        flex-direction: column;
        /* Added backdrop filter for glass effect */
        backdrop-filter: blur(5px);
        border: 1px solid rgba(255, 255, 255, 0.1);
      }
      
      .terminal-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 10px 15px;
        /* Changed to semi-transparent header */
        background-color: rgba(51, 51, 51, 0.8);
        border-top-left-radius: 8px;
        border-top-right-radius: 8px;
      }
      
      .terminal-title {
        font-size: 14px;
        color: #ddd;
      }
      
      .terminal-controls {
        display: flex;
      }
      
      .terminal-button {
        width: 12px;
        height: 12px;
        border-radius: 50%;
        margin-left: 8px;
      }
      
      .terminal-button-red {
        background-color: #ff5f56;
      }
      
      .terminal-button-yellow {
        background-color: #ffbd2e;
      }
      
      .terminal-button-green {
        background-color: #27c93f;
      }
      
      .terminal-content {
        flex: 1;
        padding: 15px;
        overflow-y: auto;
        font-size: 14px;
        line-height: 1.5;
        color: #f0f0f0;
      }
      
      .prompt {
        color: #5bf719;
        font-weight: bold;
      }
      
      .command {
        color: #dcdcaa;
      }
      
      .output {
        color: #9cdcfe;
      }
      
      .error {
        color: #ff5647;
      }
      
      .success {
        color: #5bf719;
      }
      
      .compile-message {
        color: #dcdcaa;
      }
      
      .code-block {
        margin: 10px 0;
        padding: 10px;
        /* Made code block semi-transparent */
        background-color: rgba(30, 30, 30, 0.7);
        border-radius: 4px;
        font-family: 'Courier New', monospace;
      }
      
      .java-code .keyword {
        color: #569cd6;
      }
      
      .java-code .string {
        color: #ce9178;
      }
      
      .java-code .comment {
        color: #6a9955;
      }
      
      .java-code .method {
        color: #dcdcaa;
      }
      
      .cursor {
        color: #fff;
      }
      
      .blink {
        animation: blink 1s infinite;
      }
      
      @keyframes blink {
        0%, 100% { opacity: 1; }
        50% { opacity: 0; }
      }

      /* Added scrollbar styling */
      .terminal-content::-webkit-scrollbar {
        width: 8px;
      }

      .terminal-content::-webkit-scrollbar-track {
        background: rgba(0, 0, 0, 0.2);
      }

      .terminal-content::-webkit-scrollbar-thumb {
        background: rgba(255, 255, 255, 0.2);
        border-radius: 4px;
      }

      .terminal-content::-webkit-scrollbar-thumb:hover {
        background: rgba(255, 255, 255, 0.3);
      }
    `}</style>
  );
};

const JavaSphere = () => {
  return (
    <>
      <JavaCompilationStyles />
      <JavaCompilationAnimation />
    </>
  );
};

export default JavaSphere;