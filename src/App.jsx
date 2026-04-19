import React, { useState, useMemo } from "react";
import { ChevronRight, Search, X, Home, FileText, Pill, Star } from "lucide-react";

// --- Configurações de Cores e Temas ---
const COR = {
  primary: "#0d5c4a",      // Verde escuro principal
  primaryLight: "#e8f4ef", // Fundo verde claro
  text: "#1a1a1a",
  muted: "#666",
  border: "#eee",
  bg: "#f4f6f8",
  white: "#ffffff"
};

// --- Base de Dados de Medicamentos ---
const MEDICAMENTOS = [{"slug":"cisatracúrio","nome":"CISATRACÚRIO","nome_comercial_apresentacao":"Nimbium injetável - 2mg/mL (frascos de 20mg/10mL e 10mg/5mL)","classe_terapeutica":"Bloqueador neuromuscular não despolarizante","indicacao":"​Bloqueador neuromuscular não-despolarizante de duração intermediária utilizado durante procedimentos cirúrgicos ou em terapia intensiva para facilitar a intubação orotraqueal, promovendo relaxamento da musculatura esquelética durante cirurgia e ventilação mecânica.1","dose":"​Adulto\n\nRecomenda-se o monitoramento da função neuromuscular durante a administração, a fim de se individualizar as doses necessárias.\n\nIntubação orotraqueal\nde indução\n\n0,15mg/kg, administrada rapidamente ao longo de 5 a 10 segundos. Esta dose produz condições boas a excelentes para a intubação orotraqueal em 120 segundos após a administração.\ns mais altas reduzem o tempo para o início do bloqueio neuromuscular;\nde manutenção \n\nBôlus: uma dose de 0,03mg/kg proporciona aproximadamente 20 minutos adicionais de bloqueio neuromuscular clinicamente eficaz durante anestesia por opioides ou propofol.\ns de manutenção consecutivas não resultam em prolongamento progressivo do efeito;\n\nInfusão intravenosa: Ver velocidade de infusão na tabela 2.1,10\npara pacientes adultos em unidades de terapia intensiva\n\nUma taxa de infusão inicial de cisatracúrio de 3mcg/kg/min (0,18mg/kg/h) é recomendada para pacientes adultos em UTI. Pode haver uma variação interpacientes ampla na necessidade de dose e esta pode aumentar ou diminuir com o tempo. Em estudos clínicos a velocidade de infusão média foi de 3mcg/kg/min [faixa de 0,5 a 10,2mcg/kg/min (0,03 a 0,6mg/kg/h)]. Os tempos médios para a recuperação espontânea completa, após infusão de longo prazo (até 6 dias) de cisatracúrio em pacientes em UTIs, foi de aproximadamente 50 minutos. 1,10\n\nTabela 1: Velocidade de infusão de cisatracúrio injetável 5mg/mL para pacientes adultos em unidade de terapia intensiva.\n​Peso do paciente\n(kg)\n​\t​\n(μg/kg/min)​ ​\t\n​Velocidade de\ninfusão\n\n​1,0\t​1,5\t​2,0\t​3,0\n​70\t​0,8\t​1,2\t​1,7\t​2,5\t​mL/h\n​100\t​1,2\t​1,8\t​2,4\t​3,6\t​mL/h\n\nPediatria (2-12 anos)\nde Indução\n\n0,1mg/kg, administrada em 5 a 10 segundos;\nde manutenção\n\nBolus: uma dose de 0,02mg/kg proporciona aproximadamente 9 minutos de bloqueio neuromuscular clinicamente eficaz adicional durante anestesia por halotano. Não há dados suficientes para se descrever uma recomendação específica para a dosagem de manutenção em pacientes pediátricos de 2-12 anos de idade. Entretanto, dados muito limitados, obtidos de estudos clínicos em pacientes pediátricos menores de 2 anos de idade, sugerem que a dose de manutenção de 0,03mg/kg pode prolongar o bloqueio neuromuscular clinicamente efetivo por um período de até 25 minutos, durante anestesia com opioides.\n\nInfusão intravenosa: ver tabela 2 de velocidade de infusão. 1,10\n\nAjuste de dose\n\nInsuficiência renal: Não há necessidade de ajustes de dose para pacientes com insuficiência renal. Hemodiálise: Não foram encontradas informações sobre ajuste de dose nas referências consultadas.1,10\n\nInsuficiência hepática: Não há necessidade de ajustes de dose para pacientes com insuficiência hepática.1,10\n(μg/kg/min)\n ​\t​Velocidade de infusão\n\n​1,0\t​1,5\t​2,0\t​3,0\n​20\t​0,6\t​0,9\t​1,2\t​1,8\t​mL/h\n​70\t​2,1\t​3,2\t​4,2\t\n​6,3\n \n\t​mL/h\n​100\t​3,0\t​4,5\t​6,0\t​9,0\t​mL/h\n\n \n\nEstabilidade / Conservação\n\n​24h TA.1","via_de_administracao":"​EV.1","preparo_diluicao":"​O cisatracúrio pode ser diluído em concentrações de 0,1 a 2mg/mL em SF ou SG 5%.1","administracao":"Estabilidade / Conservação\nVelocidade de Infusão\n\nA manutenção do bloqueio neuromuscular pode ser alcançada com uma velocidade de infusão inicial de 3mcg/kg/min (0,18mg/kg/h), recomendada para restaurar 89% a 99% de supressão T1 após evidências de recuperação espontânea. Após um período inicial de estabilização do bloqueio neuromuscular, uma velocidade de 1 a 2mcg/kg/min (0,06 a 0,12mg/kg/h) deve ser adequada para manter o bloqueio nesta faixa na maioria dos pacientes. A redução da velocidade de infusão em aproximadamente 40% pode ser necessária quando é administrado durante anestesia por isoflurano ou enflurano. A velocidade de infusão depende da concentração de cisatracúrio na solução de infusão, do grau de bloqueio neuromuscular desejado e do peso do paciente. A tabela seguinte fornece diretrizes para a administração não diluída.1\n\nTabela 2: Velocidade de infusão de cisatracúrio para manutenção do bloqueio neuromuscular.\n\n​Peso do paciente (kg)\n​\t\n​","cuidados_especificos_monitoramento":"Contraindicação\nUso Durante a Gestação\nCISATRACÚRIO\n​Pode haver reação alérgica cruzada entre cisatracúrio e outros bloqueadores neuromusculares. Pacientes com queimaduras extensas podem desenvolver resistência a bloqueadores neuromusculares não-despolarizantes. Pacientes com miastenia gravis e outras doenças neuromusculares apresentaram grande aumento da sensibilidade a agentes bloqueadores não-despolarizantes. A dose máxima inicial para estes pacientes é de 0,02mg/kg. Desbalanço ácido-base ou eletrolítico podem ocasionar alteração da resposta aos bloqueadores neuromusculares.1\n\nReações adversas\n\nRubor, rash cutâneo, bradicardia, hipotensão, broncoespasmo, anafilaxia, fraqueza muscular e/ou miopatia. Pode ocorrer hipertermia maligna.1\n\nToxicologia\n\nEfeitos Clínicos: doses elevadas de cisatracurio podem levar a bloqueio neuromuscular prolongado;\n\nTratamento: o tratamento primário inclui a manutenção da ventilação mecânica até recuperação da função neuromuscular; a reversão dos efeitos do cisatracúrio pode ser realizada com administração de neostigmina e atropina (administradas em seringas separadas):\n\nAdulto: neostigmina: 0,5-2mg em bolus associado a atropina 0,6 a 1,2mg. A administração pode ser repetida. Raramente a dose total de neostigmina irá exceder 5mg;\n\nPediatria: neostigmina 0,02 a 0,075mg/kg em bolus associada a atropina 0,01 a 0,02mg/kg. 10\n\nContraindicação\n\n​Contraindicado para pacientes com conhecida hipersensibilidade ao cisatracúrio, atracúrio ou ácido benzenossulfônico.1\n\nUso Durante a Gestação\n\n​Risco B: não há dados sobre a administração de cisatracúrio em gestantes. O medicamento somente deve ser administrado se os benefícios superarem os riscos ao feto.1,10\n\nAtualizado em: 30/03/2018","status":"ok"},{"slug":"ceftazidima","nome":"CEFTAZIDIMA","nome_comercial_apresentacao":"Kefadim injetável - 1g/frasco​","classe_terapeutica":"Antimicrobiano, Cefalosporina terceira geração","indicacao":"​Tratamento de infecção provocada por Pseudomonas aeruginosa; Infecções aeróbicas gram-negativos; tratamento empírico de neutropenia febril.3","dose":"​Adulto\n\nEV: 1-2g a cada 8 horas.1,3\n\nPediatria (1 mês a 12 anos)\n\n30-50mg/kg/dose a cada 8 horas.3\nMáxima\n\n6g/dia.3\n\nAjuste de\nInsuficiência renal3: \nClCr 31 - 50 mL/minuto: 1g a cada 12 horas. \nClCr 16 - 30 mL/minuto: 1g a cada 24 horas. \n\nClCr 6 - 15 mL/minuto: 500mg a cada 24 horas.\nClcr < 5 mL/minuto: Administrar 500mg a cada 48 horas. \n\nHemodiálise\n\nIntermitente: Dialisável (50% a 100%); Administrar dose após diálise: 0,5-1g em cada 24 horas ou 1-2g cada 48-72 horas.\n\nCVVH: dose de ataque de 2g, seguido de 1 a 2g a cada 12h.2\nCVVHD / CVVHDF: dose de ataque de 2g, seguido por 1g a cada 8h ou a cada 12h. A posologia de 1g de 8/8h resulta em concentrações estáveis semelhantes a 2h a cada 12h. A posologia de 2g de 8/8h pode ser necessária para gram-negativos com MIC ≥ 4 mg/L.2\n\nInsuficiência hepática: Não é necessário ajuste para insuficiência hepática.3","via_de_administracao":"​EV e IM","preparo_diluicao":"​Reconstituição\nEV: 10mL de AD.10 Retirar o ar para facilitar a aspiração.\n\nIM: 3mL de AD ou Lidocaína 0,5-1%.10\nDiluição\n10-50mL de SF, SG 5%, SG 10%, Ringer lactato.1,3","administracao":"Estabilidade / Conservação\nEV\n\nDireta: de 3-5 minutos.3\n\nDiluído: de 15-30 minutos.3\n\nIM\nAdministrar em áreas de grande massa muscular.3\n\nHemodialise: Administrar por 10min com a máquina em UF (banho desligado).\n\nEstabilidade / Conservação\n​EV\n12 horas TA ou 7 dias sob refrigeração.1\nIM\n3 horas em TA.1","cuidados_especificos_monitoramento":"CEFTAZIDIMA\n​Hemodialise: Aumentar o tempo de hemodiálise proporcional ao tempo de administração do medicamento (a critério médico)\n\nAtualizado em: 27/01/2025","status":"ok"}];

const CAMPOS = [
  { key: "nome_comercial_apresentacao", label: "Apresentação", icon: "💊" },
  { key: "classe_terapeutica", label: "Classe Terapêutica", icon: "🏷" },
  { key: "indicacao", label: "Indicação", icon: "📋" },
  { key: "dose", label: "Dose", icon: "⚖️" },
  { key: "via_de_administracao", label: "Via de Administração", icon: "💉" },
  { key: "preparo_diluicao", label: "Preparo / Diluição", icon: "🧪" },
  { key: "administracao", label: "Administração", icon: "⏱" },
  { key: "cuidados_especificos_monitoramento", label: "Cuidados e Monitoramento", icon: "⚠️" },
];

// --- Componentes Globais ---

function Header({ titulo, onBack }) {
  return (
    <div className="sticky top-0 z-50 flex items-center h-14 px-4 gap-3 bg-[#0d5c4a] shadow-md transition-all">
      <div className="w-8 h-8 bg-white rounded-lg flex items-center justify-center font-bold text-[#0d5c4a] shadow-sm">
        P
      </div>
      <h1 className="text-white font-bold text-lg tracking-tight flex-1">{titulo}</h1>
    </div>
  );
}

function BottomNav({ ativa, onChange }) {
  const itens = [
    { id: "home", label: "Início", icon: <Home size={22} /> },
    { id: "prescricoes", label: "Prescrições", icon: <FileText size={22} /> },
    { id: "bulas", label: "Bulas", icon: <Pill size={22} /> },
    { id: "favoritos", label: "Favoritos", icon: <Star size={22} /> },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 flex justify-around items-center pb-[env(safe-area-inset-bottom,16px)] pt-2 z-50 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
      {itens.map(item => {
        const isAtiva = ativa === item.id;
        return (
          <button
            key={item.id}
            onClick={() => onChange(item.id)}
            className={`flex flex-col items-center gap-1 p-2 transition-all relative ${isAtiva ? "text-[#0d5c4a]" : "text-gray-400 hover:text-gray-600"}`}
          >
            {item.icon}
            <span className={`text-[10px] font-bold tracking-wide transition-opacity ${isAtiva ? "opacity-100" : "opacity-70"}`}>
              {item.label}
            </span>
            {isAtiva && (
              <div className="absolute -bottom-1 w-6 h-1 bg-[#0d5c4a] rounded-full animate-in fade-in zoom-in duration-300" />
            )}
          </button>
        );
      })}
    </div>
  );
}

function FichaModal({ med, onClose }) {
  if (!med) return null;
  return (
    <div className="fixed inset-0 z-[100] flex items-end bg-black/50 backdrop-blur-sm transition-all duration-300" onClick={onClose}>
      <div 
        className="w-full max-h-[92vh] bg-white rounded-t-[32px] overflow-y-auto animate-in slide-in-from-bottom duration-300 shadow-2xl" 
        onClick={e => e.stopPropagation()}
      >
        <div className="flex justify-center py-4">
          <div className="w-12 h-1.5 bg-gray-200 rounded-full" />
        </div>
        <div className="px-6 pb-4 border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-10 flex justify-between items-center">
          <div className="flex-1">
            <h2 className="text-xl font-black text-[#0d5c4a] tracking-tight">{med.nome}</h2>
            <div className="flex flex-wrap gap-2 mt-2">
               <span className="text-[10px] bg-[#e8f4ef] text-[#0d5c4a] px-3 py-1 rounded-full font-bold uppercase tracking-wider">
                {med.classe_terapeutica}
              </span>
            </div>
          </div>
          <button onClick={onClose} className="ml-4 p-2.5 bg-gray-100 hover:bg-gray-200 rounded-full text-gray-500 transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6 space-y-6 pb-20">
          {CAMPOS.map(campo => med[campo.key] && (
            <div key={campo.key} className="group">
              <h4 className="text-[10px] font-black text-[#0d5c4a] uppercase tracking-[0.15em] mb-3 flex items-center gap-2 opacity-80">
                <span className="text-sm grayscale group-hover:grayscale-0 transition-all">{campo.icon}</span> {campo.label}
              </h4>
              <div className="p-5 bg-gray-50 rounded-2xl border border-gray-100 text-[13px] leading-relaxed text-gray-800 whitespace-pre-wrap shadow-sm">
                {med[campo.key]}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// --- Telas ---

function TelaHome({ onNavegar }) {
  const [busca, setBusca] = useState("");
  const [medSelecionado, setMedSelecionado] = useState(null);

  const resultados = useMemo(() => {
    const q = busca.toLowerCase().trim();
    if (!q) return [];
    return MEDICAMENTOS.filter(m => m.nome.toLowerCase().includes(q)).slice(0, 5);
  }, [busca]);

  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <Header titulo="Prescrevendo" />
      <div className="p-6">
        <div className="relative mb-8 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-[#0d5c4a] transition-colors" size={20} />
          <input
            type="text"
            className="w-full bg-white border border-gray-200 rounded-2xl py-4.5 pl-12 pr-12 text-sm shadow-sm focus:ring-4 focus:ring-[#0d5c4a]/10 focus:border-[#0d5c4a] outline-none transition-all placeholder:text-gray-400"
            placeholder="Pesquisar medicamento ou classe..."
            value={busca}
            onChange={e => setBusca(e.target.value)}
          />
          {busca && (
            <button onClick={() => setBusca("")} className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full transition-colors">
              <X size={18} className="text-gray-400" />
            </button>
          )}
        </div>

        {busca && (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-xl overflow-hidden mb-8 animate-in fade-in slide-in-from-top-2 duration-300">
            {resultados.length > 0 ? (
              resultados.map((m, i) => (
                <button 
                  key={m.slug} 
                  onClick={() => setMedSelecionado(m)} 
                  className={`w-full p-4.5 flex justify-between items-center active:bg-gray-50 transition-colors ${i !== resultados.length - 1 ? "border-b border-gray-50" : ""}`}
                >
                  <div className="text-left">
                    <p className="font-bold text-sm text-gray-800">{m.nome}</p>
                    <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tight">{m.classe_terapeutica}</p>
                  </div>
                  <ChevronRight size={18} className="text-[#0d5c4a]" />
                </button>
              ))
            ) : (
              <div className="p-8 text-center text-gray-400 text-sm italic">Nenhum resultado encontrado</div>
            )}
          </div>
        )}

        <h3 className="text-[11px] font-black text-gray-400 uppercase tracking-[0.2em] mb-4 pl-1">Acesso Rápido</h3>
        <div className="grid grid-cols-2 gap-4">
          <button 
            onClick={() => onNavegar("prescricoes")}
            className="bg-white p-6 rounded-[24px] border border-gray-100 flex flex-col items-center gap-4 shadow-sm hover:shadow-md active:scale-95 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#fff8e8] flex items-center justify-center text-3xl shadow-inner">📝</div>
            <span className="text-xs font-black text-gray-700 uppercase tracking-wide">Prescrições</span>
          </button>
          <button 
            onClick={() => onNavegar("bulas")}
            className="bg-white p-6 rounded-[24px] border border-gray-100 flex flex-col items-center gap-4 shadow-sm hover:shadow-md active:scale-95 transition-all"
          >
            <div className="w-14 h-14 rounded-2xl bg-[#e8f4ef] flex items-center justify-center text-3xl shadow-inner">💊</div>
            <span className="text-xs font-black text-gray-700 uppercase tracking-wide">Bulário</span>
          </button>
          <button className="bg-white p-6 rounded-[24px] border border-gray-100 flex flex-col items-center gap-4 shadow-sm opacity-50 cursor-not-allowed">
            <div className="w-14 h-14 rounded-2xl bg-[#e8f0fd] flex items-center justify-center text-3xl">🧮</div>
            <span className="text-xs font-black text-gray-400 uppercase tracking-wide">Cálculos</span>
          </button>
          <button className="bg-white p-6 rounded-[24px] border border-gray-100 flex flex-col items-center gap-4 shadow-sm opacity-50 cursor-not-allowed">
            <div className="w-14 h-14 rounded-2xl bg-[#fde8e8] flex items-center justify-center text-3xl">📊</div>
            <span className="text-xs font-black text-gray-400 uppercase tracking-wide">Escores</span>
          </button>
        </div>
      </div>
      <FichaModal med={medSelecionado} onClose={() => setMedSelecionado(null)} />
    </div>
  );
}

function TelaPrescricoes() {
  const SISTEMAS = [
    { icon: "🚨", nome: "Admitindo Paciente Grave", cor: "#fde8e8" },
    { icon: "❤️", nome: "Cardiologia", cor: "#fde8e8" },
    { icon: "🩺", nome: "Endocrinologia", cor: "#fef3e2" },
    { icon: "🫄", nome: "Gastroenterologia / Hepatologia", cor: "#e8f4ef" },
    { icon: "🩸", nome: "Hematologia", cor: "#fde8e8" },
    { icon: "💧", nome: "Nefrologia", cor: "#e8f0fd" },
    { icon: "🧠", nome: "Neurologia", cor: "#f0e8fd" },
    { icon: "🎗️", nome: "Oncologia", cor: "#fde8f4" },
    { icon: "🫁", nome: "Pneumologia", cor: "#e8f0fd" },
    { icon: "🦴", nome: "Reumatologia", cor: "#fef3e2" },
    { icon: "🏥", nome: "Paciente Crítico", cor: "#e8f4ef" }
  ];

  return (
    <div className="min-h-screen bg-[#f4f6f8] pb-24">
      <Header titulo="Prescrições" />
      <div className="p-4 space-y-3">
        {SISTEMAS.map((item, index) => (
          <div
            key={index}
            className="bg-white border border-gray-100 rounded-2xl p-3 flex items-center gap-4 shadow-sm active:bg-gray-50 hover:border-[#0d5c4a]/30 transition-all cursor-pointer group"
          >
            {/* Box do Ícone com cor de fundo suave */}
            <div 
              className="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl shrink-0 shadow-sm transition-transform group-hover:scale-105"
              style={{ backgroundColor: item.cor }}
            >
              {item.icon}
            </div>
            
            {/* Nome da Especialidade */}
            <div className="flex-1">
              <span className="text-[15px] font-bold text-gray-800 leading-tight block">
                {item.nome}
              </span>
            </div>

            {/* Seta indicadora */}
            <ChevronRight size={20} className="text-gray-300 mr-2 group-hover:text-[#0d5c4a] transition-colors" />
          </div>
        ))}
      </div>
    </div>
  );
}

function TelaBulas() {
  return (
    <div className="min-h-screen bg-[#f4f6f8]">
      <Header titulo="Bulário" />
      <div className="p-12 text-center text-gray-400">
        <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-sm">
          <Pill size={40} className="opacity-20" />
        </div>
        <p className="text-sm font-bold uppercase tracking-widest text-gray-300">Em Desenvolvimento</p>
        <p className="mt-2 text-xs text-gray-400">A base completa de medicamentos estará disponível em breve.</p>
      </div>
    </div>
  );
}

// --- App Root ---

export default function App() {
  const [aba, setAba] = useState("home");

  const renderPagina = () => {
    switch (aba) {
      case "home": return <TelaHome onNavegar={setAba} />;
      case "prescricoes": return <TelaPrescricoes />;
      case "bulas": return <TelaBulas />;
      case "favoritos": 
        return (
          <div className="min-h-screen bg-[#f4f6f8]">
            <Header titulo="Favoritos" />
            <div className="p-20 text-center text-gray-300">
              <Star size={48} className="mx-auto mb-4 opacity-10" />
              <p className="text-sm font-bold italic">Nenhum favorito ainda</p>
            </div>
          </div>
        );
      default: return <TelaHome onNavegar={setAba} />;
    }
  };

  return (
    <div className="max-w-md mx-auto relative shadow-2xl min-h-screen overflow-x-hidden">
      {renderPagina()}
      <BottomNav ativa={aba} onChange={setAba} />
    </div>
  );
}
