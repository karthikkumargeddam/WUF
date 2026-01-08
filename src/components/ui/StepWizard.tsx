"use client";

import { ReactNode } from 'react';
import { Check } from 'lucide-react';

interface Step {
    id: number;
    title: string;
    description?: string;
}

interface StepWizardProps {
    steps: Step[];
    currentStep: number;
    onStepChange: (step: number) => void;
    children: ReactNode;
    canGoNext?: boolean;
    canGoPrevious?: boolean;
    onNext?: () => void;
    onPrevious?: () => void;
    onComplete?: () => void;
    isComplete?: boolean;
}

export default function StepWizard({
    steps,
    currentStep,
    onStepChange,
    children,
    canGoNext = true,
    canGoPrevious = true,
    onNext,
    onPrevious,
    onComplete,
    isComplete = false,
}: StepWizardProps) {
    const handleNext = () => {
        if (currentStep < steps.length && canGoNext) {
            onNext?.();
            onStepChange(currentStep + 1);
        } else if (currentStep === steps.length && onComplete) {
            // If on last step, trigger completion
            onComplete();
        }
    };

    const handlePrevious = () => {
        if (currentStep > 1 && canGoPrevious) {
            onPrevious?.();
            onStepChange(currentStep - 1);
        }
    };

    const progress = (currentStep / steps.length) * 100;

    return (
        <div className="space-y-8">
            {/* Progress Bar */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400">
                        Step {currentStep} of {steps.length}
                    </p>
                    <p className="text-xs font-black uppercase tracking-widest text-zinc-400">
                        {Math.round(progress)}% Complete
                    </p>
                </div>
                <div className="h-2 bg-zinc-100 rounded-full overflow-hidden">
                    <div
                        className="h-full bg-zinc-950 transition-all duration-500 ease-out"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            {/* Step Indicators */}
            <div className="flex items-center justify-between">
                {steps.map((step, index) => {
                    const stepNumber = index + 1;
                    const isActive = stepNumber === currentStep;
                    const isCompleted = stepNumber < currentStep;

                    return (
                        <div key={step.id} className="flex-1 flex items-center">
                            <div className="flex flex-col items-center flex-1">
                                <button
                                    onClick={() => onStepChange(stepNumber)}
                                    disabled={stepNumber > currentStep}
                                    className={`w-12 h-12 rounded-full flex items-center justify-center font-black text-sm transition-all ${isCompleted
                                        ? 'bg-zinc-950 text-white'
                                        : isActive
                                            ? 'bg-zinc-950 text-white ring-4 ring-zinc-950/20'
                                            : 'bg-zinc-100 text-zinc-400'
                                        } ${stepNumber <= currentStep ? 'cursor-pointer hover:scale-110' : 'cursor-not-allowed'}`}
                                >
                                    {isCompleted ? <Check size={20} /> : stepNumber}
                                </button>
                                <div className="mt-3 text-center">
                                    <p className={`text-xs font-black uppercase tracking-tight ${isActive ? 'text-zinc-900' : 'text-zinc-400'
                                        }`}>
                                        {step.title}
                                    </p>
                                    {step.description && (
                                        <p className="text-[10px] text-zinc-500 mt-1 hidden md:block">
                                            {step.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                            {index < steps.length - 1 && (
                                <div className={`h-0.5 flex-1 mx-2 ${stepNumber < currentStep ? 'bg-zinc-950' : 'bg-zinc-200'
                                    }`} />
                            )}
                        </div>
                    );
                })}
            </div>

            {/* Content */}
            <div className="bg-white border-2 border-zinc-100 rounded-[2.5rem] p-8 md:p-12 min-h-[400px]">
                {children}
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between gap-4">
                <button
                    onClick={handlePrevious}
                    disabled={currentStep === 1 || !canGoPrevious}
                    className="px-8 py-4 bg-zinc-100 text-zinc-900 font-black uppercase tracking-widest text-xs rounded-xl hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                >
                    Previous
                </button>

                <button
                    onClick={handleNext}
                    disabled={!canGoNext}
                    className="px-8 py-4 bg-zinc-950 text-white font-black uppercase tracking-widest text-xs rounded-xl hover:bg-zinc-800 disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg"
                >
                    {currentStep === steps.length ? (isComplete ? 'Add to Cart' : 'Complete') : 'Next Step'}
                </button>
            </div>
        </div>
    );
}
