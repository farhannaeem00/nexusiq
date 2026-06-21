import Link from 'next/link';
import {
  Brain, BarChart2, TrendingUp,
  Users, ArrowRight, CheckCircle, Zap
} from 'lucide-react';

const FeatureCard = ({ icon, title, description }) => (
  <div className="bg-gray-900 border border-gray-800 rounded-2xl p-6
                  hover:border-indigo-500/50 transition">
    <div className="w-12 h-12 bg-indigo-500/10 rounded-xl
                    flex items-center justify-center mb-4">
      {icon}
    </div>
    <h3 className="font-semibold text-white mb-2">{title}</h3>
    <p className="text-gray-400 text-sm leading-relaxed">{description}</p>
  </div>
);

export default function Landing() {
  return (
    <div className="min-h-screen bg-gray-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-gray-800 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Brain className="text-indigo-400" size={24} />
            <span className="text-xl font-bold">NexusIQ</span>
          </div>
          <div className="flex items-center gap-3">
            <Link href="/login"
              className="text-sm text-gray-400 hover:text-white transition">
              Sign In
            </Link>
            <Link href="/register"
              className="text-sm bg-indigo-600 text-white px-4 py-2
                         rounded-lg hover:bg-indigo-700 transition font-medium">
              Get Started Free
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <section className="max-w-6xl mx-auto px-6 py-24 text-center">
        <div className="inline-flex items-center gap-2 bg-indigo-500/10
                        text-indigo-400 text-sm font-medium px-4 py-2
                        rounded-full mb-6 border border-indigo-500/20">
          <Zap size={14} /> AI-Powered Business Intelligence
        </div>

        <h1 className="text-6xl font-black leading-tight mb-6">
          Ask Your Data
          <span className="text-indigo-400"> Anything</span>
        </h1>

        <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-10">
          Upload your CSV data. Ask questions in plain English.
          Get instant charts, forecasts, and AI insights —
          no SQL knowledge needed.
        </p>

        <div className="flex items-center justify-center gap-4 flex-wrap">
          <Link href="/register"
            className="flex items-center gap-2 bg-indigo-600 text-white
                       px-8 py-4 rounded-xl hover:bg-indigo-700 transition
                       font-semibold text-lg shadow-lg shadow-indigo-900/50">
            Start For Free <ArrowRight size={20} />
          </Link>
          <Link href="/login"
            className="flex items-center gap-2 bg-gray-800 text-white
                       px-8 py-4 rounded-xl hover:bg-gray-700 transition
                       font-semibold text-lg border border-gray-700">
            Sign In
          </Link>
        </div>

        <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
          {[
            'No SQL needed',
            'Free to use',
            'AI-powered insights',
          ].map(item => (
            <div key={item}
              className="flex items-center gap-2 text-gray-500 text-sm">
              <CheckCircle size={14} className="text-green-500" />
              {item}
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Everything You Need to Understand Your Data
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard
            icon={<Brain className="text-indigo-400" size={24} />}
            title="Ask in Plain English"
            description="Type any question about your data. AI understands and answers with charts instantly."
          />
          <FeatureCard
            icon={<BarChart2 className="text-blue-400" size={24} />}
            title="Auto Chart Generation"
            description="AI picks the best chart type automatically — bar, line, pie, area — no setup needed."
          />
          <FeatureCard
            icon={<TrendingUp className="text-green-400" size={24} />}
            title="Revenue Forecasting"
            description="ML model predicts your next 6 months revenue based on historical data trends."
          />
          <FeatureCard
            icon={<Users className="text-red-400" size={24} />}
            title="Churn Prediction"
            description="Identify customers likely to leave before they do. Take action early."
          />
        </div>
      </section>

      {/* How It Works */}
      <section className="bg-gray-900 border-y border-gray-800 py-20">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">How It Works</h2>
          </div>
          <div className="flex flex-col gap-8">
            {[
              { n: '1', t: 'Upload Your CSV', d: 'Upload any CSV file — sales, customers, inventory, anything.' },
              { n: '2', t: 'Ask a Question', d: 'Type "What were my top products?" and hit enter.' },
              { n: '3', t: 'Get AI Insights', d: 'AI analyzes your data and returns charts, answers, and recommendations.' },
              { n: '4', t: 'Predict the Future', d: 'Use forecasting and churn models to make smarter business decisions.' },
            ].map(step => (
              <div key={step.n} className="flex gap-4">
                <div className="w-10 h-10 bg-indigo-600 text-white
                                rounded-full flex items-center justify-center
                                font-bold text-sm shrink-0">
                  {step.n}
                </div>
                <div>
                  <h4 className="font-semibold text-white mb-1">{step.t}</h4>
                  <p className="text-gray-400 text-sm leading-relaxed">{step.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="max-w-6xl mx-auto px-6 py-20 text-center">
        <h2 className="text-4xl font-black mb-4">
          Start Analyzing Your Data Today
        </h2>
        <p className="text-gray-400 text-lg mb-8">
          Free forever. No credit card needed.
        </p>
        <Link href="/register"
          className="inline-flex items-center gap-2 bg-indigo-600 text-white
                     px-10 py-4 rounded-xl hover:bg-indigo-700 transition
                     font-semibold text-lg shadow-lg shadow-indigo-900/50">
          Get Started Free <ArrowRight size={20} />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-800 py-8 text-center
                         text-gray-500 text-sm">
        <div className="flex items-center justify-center gap-2 mb-2">
          <Brain className="text-indigo-400" size={18} />
          <span className="font-semibold text-gray-300">NexusIQ</span>
        </div>
        <p>© {new Date().getFullYear()} NexusIQ. AI Business Intelligence.</p>
      </footer>

    </div>
  );
}