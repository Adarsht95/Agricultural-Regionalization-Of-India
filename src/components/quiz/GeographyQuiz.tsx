import React, { useState } from 'react';
import { HelpCircle, CheckCircle, XCircle, RefreshCw, Trophy, ArrowRight, ShieldCheck } from 'lucide-react';
import confetti from 'canvas-confetti';
import { QuizQuestion } from '../../types';

export const GeographyQuiz: React.FC = () => {
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState<boolean>(false);
  const [score, setScore] = useState<number>(0);
  const [showResults, setShowResults] = useState<boolean>(false);

  // Grounded exclusively in supplied PDF documents and verified shapefile attributes
  const questions: QuizQuestion[] = [
    {
      id: 1,
      type: 'mcq',
      question: 'How many major Agro-Climatic Zones was India divided into by the Planning Commission in 1989?',
      options: ['10 Zones', '12 Zones', '15 Zones', '20 Zones'],
      correctIndex: 2,
      explanation: 'The Planning Commission in 1989, in association with NRSA, divided India into 15 Agro-Climatic Regions, further subdivided into 72 sub-zones.',
      sourceBadge: 'Planning Commission (1989)'
    },
    {
      id: 2,
      type: 'mcq',
      question: 'Which institution delineated India into 20 Agro-Ecological Regions using the FAO sequential overlay approach?',
      options: [
        'National Remote Sensing Agency (NRSA)',
        'Indian Council of Agricultural Research – NBSS&LUP',
        'NITI Aayog',
        'Ministry of Environment, Forest & Climate Change'
      ],
      correctIndex: 1,
      explanation: 'The National Bureau of Soil Survey and Land Use Planning (ICAR-NBSS&LUP) delineated the 20 Agro-Ecological Regions (Sehgal et al., 1992).',
      sourceBadge: 'ICAR-NBSS&LUP (1992)'
    },
    {
      id: 3,
      type: 'mcq',
      question: 'Black cotton soil (Regur), derived from Deccan basalt traps, is predominantly characteristic of which agro-climatic zones?',
      options: [
        'Western Himalayan (Zone 1) and Eastern Himalayan (Zone 2)',
        'Western Plateau & Hills (Zone 9) and Gujarat Plains & Hills (Zone 13)',
        'Trans-Gangetic Plains (Zone 6) and Upper Gangetic Plains (Zone 5)',
        'East Coast Plains (Zone 11) and Island Region (Zone 15)'
      ],
      correctIndex: 1,
      explanation: 'Regur black cotton soil is the signature soil of the Deccan trap lava plateau, dominating Western Plateau (Zone 9) and Gujarat Plains (Zone 13).',
      sourceBadge: 'Agroclimatic_regions.dbf'
    },
    {
      id: 4,
      type: 'boolean',
      question: 'True or False: Length of Growing Period (LGP) considers only the days when rainfall exceeds potential evapotranspiration (P > PET), ignoring stored soil moisture.',
      options: ['True', 'False'],
      correctIndex: 1,
      explanation: 'False. Scientifically, LGP includes days when P > 0.5 PET PLUS the period required to exhaust up to 100 mm of available soil moisture stored in the profile.',
      sourceBadge: 'FAO & NBSS&LUP LGP Formula'
    },
    {
      id: 5,
      type: 'mcq',
      question: 'Saffron cultivation and temperate fruits (apples, walnuts, almonds) in India are predominantly associated with which agro-climatic zone?',
      options: [
        'Western Himalayan Region (Zone 1)',
        'Eastern Himalayan Region (Zone 2)',
        'Southern Plateau & Hills (Zone 10)',
        'West Coast Plains & Ghats (Zone 12)'
      ],
      correctIndex: 0,
      explanation: 'Zone 1 (Western Himalayan Region) encompassing J&K, Himachal Pradesh, and Uttarakhand is the primary home of saffron (Karewa soils) and temperate apple orchards.',
      sourceBadge: 'e-PG Pathshala RG-38'
    },
    {
      id: 6,
      type: 'mcq',
      question: 'Which agro-climatic zone was the historical cradle of the Green Revolution in India, but currently faces acute groundwater depletion and stubble burning issues?',
      options: [
        'Lower Gangetic Plain Region (Zone 3)',
        'Trans Gangetic Plain Region (Zone 6)',
        'Central Plateau & Hills Region (Zone 8)',
        'Western Dry Region (Zone 14)'
      ],
      correctIndex: 1,
      explanation: 'Zone 6 (Trans Gangetic Plain: Punjab, Haryana, Delhi, Ganganagar) introduced HYV wheat and rice in the 1960s, but now faces overexploited aquifers and parali burning.',
      sourceBadge: 'Notes.docx & UPSC Text'
    },
    {
      id: 7,
      type: 'mcq',
      question: 'Under the ICAR-NBSS&LUP framework, what key modifier differentiates an Agro-Ecological Region from an Agro-Climatic Zone?',
      options: [
        'Administrative state boundaries and political constituencies',
        'Landform (Physiography) and Soil Water Capacity (LGP)',
        'Distance from major sea ports and export infrastructure',
        'Livestock population density and tractor mechanization'
      ],
      correctIndex: 1,
      explanation: 'Formula: Agro-Ecological Zone = Agro-Climatic Zone + Landform (which modifies meso-climate) + Soil water capacity (LGP).',
      sourceBadge: 'Sehgal et al. (1992)'
    },
    {
      id: 8,
      type: 'mcq',
      question: 'The Coromandel and Northern Circar coasts (Zone 11) receive significant agricultural rainfall from which monsoon system?',
      options: [
        'South-West Monsoon (June–September) exclusively',
        'North-East Monsoon (October–December) providing critical coastal showers',
        'Western Disturbances (January–February)',
        'Pre-monsoon Kalbaisakhi squalls'
      ],
      correctIndex: 1,
      explanation: 'The Coromandel Coast (Zone 11) receives its principal rainfall during the retreating North-East Monsoon from October to December.',
      sourceBadge: 'UPSC Study Material'
    }
  ];

  const handleSelect = (index: number) => {
    if (isAnswered) return;
    setSelectedOption(index);
    setIsAnswered(true);

    if (index === questions[currentIdx].correctIndex) {
      setScore((prev) => prev + 1);
      confetti({ particleCount: 50, spread: 60, origin: { y: 0.8 } });
    }
  };

  const handleNext = () => {
    if (currentIdx < questions.length - 1) {
      setCurrentIdx((prev) => prev + 1);
      setSelectedOption(null);
      setIsAnswered(false);
    } else {
      setShowResults(true);
    }
  };

  const handleRestart = () => {
    setCurrentIdx(0);
    setSelectedOption(null);
    setIsAnswered(false);
    setScore(0);
    setShowResults(false);
  };

  const q = questions[currentIdx];

  return (
    <div className="py-12 space-y-8 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      
      {/* Header */}
      <div className="space-y-2 text-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100 text-emerald-900 text-xs font-mono font-bold">
          <HelpCircle className="w-3.5 h-3.5" /> Academic Assessment
        </div>
        <h1 className="text-3xl font-extrabold font-serif-academic text-stone-900 tracking-tight">
          Test Your Geography: Agricultural Regionalization
        </h1>
        <p className="text-xs text-stone-500">
          All questions are derived exclusively from verified project texts, shapefiles, and official criteria
        </p>
      </div>

      {!showResults ? (
        <div className="bg-white rounded-3xl p-6 sm:p-8 border border-stone-200 shadow-md space-y-6">
          
          {/* Progress bar */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs font-mono text-stone-500">
              <span>Question {currentIdx + 1} of {questions.length}</span>
              <span>Score: {score} / {questions.length}</span>
            </div>
            <div className="h-1.5 w-full bg-stone-100 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-600 transition-all duration-300"
                style={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
              ></div>
            </div>
          </div>

          {/* Question Text */}
          <div className="space-y-2 pt-2">
            <span className="text-[10px] font-mono text-amber-800 bg-amber-100 px-2 py-0.5 rounded font-bold">
              {q.sourceBadge}
            </span>
            <h3 className="text-base sm:text-lg font-bold font-serif-academic text-stone-900 leading-snug">
              {q.question}
            </h3>
          </div>

          {/* Options Grid */}
          <div className="space-y-2.5">
            {q.options.map((opt, idx) => {
              let btnStyle = 'bg-stone-50 border-stone-200 text-stone-800 hover:bg-stone-100';

              if (isAnswered) {
                if (idx === q.correctIndex) {
                  btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-950 font-bold ring-2 ring-emerald-400';
                } else if (idx === selectedOption) {
                  btnStyle = 'bg-rose-100 border-rose-500 text-rose-950 font-bold ring-2 ring-rose-400';
                } else {
                  btnStyle = 'bg-stone-50 border-stone-200 text-stone-400 opacity-60';
                }
              }

              return (
                <button
                  key={idx}
                  disabled={isAnswered}
                  onClick={() => handleSelect(idx)}
                  className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-center justify-between ${btnStyle}`}
                >
                  <span>{opt}</span>
                  {isAnswered && idx === q.correctIndex && (
                    <CheckCircle className="w-5 h-5 text-emerald-600 shrink-0 ml-2" />
                  )}
                  {isAnswered && idx === selectedOption && idx !== q.correctIndex && (
                    <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-2" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Explanation & Next */}
          {isAnswered && (
            <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 space-y-3 animate-in fade-in duration-200">
              <div className="text-xs text-stone-700 leading-relaxed">
                <span className="font-bold text-stone-900 font-mono">Academic Explanation:</span> {q.explanation}
              </div>
              <div className="flex justify-end pt-1">
                <button
                  onClick={handleNext}
                  className="px-5 py-2 rounded-xl bg-[#1b4332] text-white hover:bg-emerald-900 text-xs font-mono font-bold flex items-center gap-1.5 transition-colors"
                >
                  {currentIdx === questions.length - 1 ? 'View Final Score' : 'Next Question'}
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

        </div>
      ) : (
        /* Results Screen */
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-stone-200 shadow-lg text-center space-y-6">
          <Trophy className="w-16 h-16 text-amber-500 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-2xl font-bold font-serif-academic text-stone-900">
              Quiz Completed!
            </h2>
            <p className="text-sm text-stone-500 font-mono">
              You scored <span className="text-emerald-800 font-bold text-xl">{score}</span> out of <span className="font-bold text-stone-900">{questions.length}</span> (
              {Math.round((score / questions.length) * 100)}%)
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-stone-50 border border-stone-200 max-w-md mx-auto text-xs text-stone-600 leading-relaxed">
            {score >= 7
              ? 'Outstanding grasp of Indian agro-climatic and agro-ecological geography!'
              : score >= 5
              ? 'Good geographic knowledge. Review the ACZ vs AEZ comparison and LGP modules to strengthen your score.'
              : 'Keep exploring the interactive atlas maps to master India’s agricultural zoning!'}
          </div>

          <button
            onClick={handleRestart}
            className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl bg-[#1b4332] text-white hover:bg-emerald-900 text-xs font-mono font-bold transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> Retake Quiz
          </button>
        </div>
      )}

    </div>
  );
};
