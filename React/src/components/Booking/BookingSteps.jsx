import React from 'react';
import { CheckCircle } from 'lucide-react';

const BookingSteps = ({ steps, currentStep }) => {
  return (
    <div className="mb-8">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => {
          const isCompleted = currentStep > step.id;
          const isCurrent = currentStep === step.id;
          const isUpcoming = currentStep < step.id;

          return (
            <div key={step.id} className="flex items-center flex-1">
              {/* Step Circle */}
              <div className="flex items-center">
                <div
                  className={`
                    w-10 h-10 rounded-full flex items-center justify-center font-semibold text-sm
                    ${isCompleted 
                      ? 'bg-green-500 text-white' 
                      : isCurrent 
                        ? 'bg-primary-500 text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }
                  `}
                >
                  {isCompleted ? (
                    <CheckCircle className="w-6 h-6" />
                  ) : (
                    step.id
                  )}
                </div>
                
                {/* Step Info */}
                <div className="ml-3 hidden md:block">
                  <p className={`font-semibold text-sm ${
                    isCurrent ? 'text-primary-600' : 'text-secondary-700'
                  }`}>
                    {step.title}
                  </p>
                  <p className="text-xs text-secondary-500">
                    {step.description}
                  </p>
                </div>
              </div>

              {/* Connector Line */}
              {index < steps.length - 1 && (
                <div className="flex-1 mx-4">
                  <div
                    className={`h-0.5 ${
                      isCompleted ? 'bg-green-500' : 'bg-gray-200'
                    }`}
                  />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Mobile Step Info */}
      <div className="md:hidden mt-4 text-center">
        <p className="font-semibold text-primary-600">
          {steps.find(step => step.id === currentStep)?.title}
        </p>
        <p className="text-sm text-secondary-500">
          {steps.find(step => step.id === currentStep)?.description}
        </p>
      </div>
    </div>
  );
};

export default BookingSteps;