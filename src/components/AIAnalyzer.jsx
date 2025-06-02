import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';
import { analyzeFabricImage } from '../utils/aiApi';

export default function AIAnalyzer() {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState(null);

  const onDrop = useCallback(async (acceptedFiles) => {
    try {
      setAnalyzing(true);
      const file = acceptedFiles[0];
      const analysis = await analyzeFabricImage(file);
      setResults(analysis);
    } catch (error) {
      console.error('Analysis error:', error);
    } finally {
      setAnalyzing(false);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {'image/*': []}
  });

  return (
    <div className="p-6 bg-white rounded-xl shadow-lg">
      <h3 className="text-xl font-semibold mb-4">Kumaş Analizi</h3>
      
      <div {...getRootProps()} className={`
        border-2 border-dashed rounded-lg p-8 text-center cursor-pointer
        transition-all duration-200 ease-in-out
        ${isDragActive ? 'border-indigo-500 bg-indigo-50' : 'border-gray-300 hover:border-indigo-400'}
      `}>
        <input {...getInputProps()} />
        <p className="text-gray-600">
          {isDragActive ? 'Kumaş fotoğrafını buraya bırakın' : 'Analiz için kumaş fotoğrafı sürükleyin veya tıklayın'}
        </p>
      </div>

      {analyzing && (
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="mt-4 text-center"
        >
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-indigo-500 border-t-transparent"></div>
          <p className="mt-2 text-indigo-600">Kumaş analiz ediliyor...</p>
        </motion.div>
      )}

      {results && (
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mt-6 p-4 bg-gray-50 rounded-lg"
        >
          <h4 className="font-semibold mb-2">Analiz Sonuçları</h4>
          <ul className="space-y-2">
            {Object.entries(results).map(([key, value]) => (
              <li key={key} className="flex justify-between">
                <span className="text-gray-600">{key}:</span>
                <span className="font-medium">{value}</span>
              </li>
            ))}
          </ul>
        </motion.div>
      )}
    </div>
  );
}