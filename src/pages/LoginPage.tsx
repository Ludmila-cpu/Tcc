import React from 'react';
import { useNavigate } from 'react-router-dom';

const LoginPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg max-w-md w-full">
        <div className="text-center mb-8">
          <img src="/Imagem2.svg" alt="Vereco Logo" className="w-40 mx-auto mb-4" />
          <img src="/Imagem1.svg" alt="Shopping Illustration" className="w-full max-w-xs mx-auto" />
        </div>
        
        <div className="space-y-4">
          <button
            onClick={() => navigate('/produtos')}
            className="btn-primary w-full"
          >
            Entrar
          </button>
          
          <button
            onClick={() => alert('Cadastro em breve...')}
            className="btn-outline w-full"
          >
            Registrar
          </button>
          
          <p className="text-center text-gray-600">Ou entre com</p>
          
          <div className="flex gap-4 justify-center">
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <img src="/logo-google-.png" alt="Google Icon" className="w-5 h-5" />
              Google
            </button>
            <button className="flex items-center gap-2 px-4 py-2 border rounded-lg hover:bg-gray-50">
              <img src="/face.svg" alt="Facebook Icon" className="w-5 h-5" />
              Facebook
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
