import React from 'react';
import { motion } from 'framer-motion';

export default function FabricVisualizer({ fabricData }) {
  return (
    <div className="w-full h-[400px] rounded-xl overflow-hidden shadow-lg bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="text-center p-8"
      >
        <div className="w-32 h-32 mx-auto mb-4 bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg shadow-lg flex items-center justify-center">
          <span className="text-white text-2xl font-bold">3D</span>
        </div>
        <h3 className="text-xl font-semibold text-gray-800 mb-2">3D Kumaş Görselleştirici</h3>
        <p className="text-gray-600">
          Kumaş özelliklerini 3D ortamda görüntülemek için gelişmiş WebGL teknolojisi kullanılır.
        </p>
        {fabricData && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-sm">
            <p className="text-sm text-gray-700">
              Kumaş: {fabricData.name || 'Bilinmeyen'}
            </p>
          </div>
        )}
      </motion.div>
    </div>
  );
}