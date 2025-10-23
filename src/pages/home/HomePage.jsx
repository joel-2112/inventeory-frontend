import React from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  ArrowRight, 
  CheckCircle,
  Play,
  Building,
  Store,
  Truck,
  BarChart3,
  Database,
  Workflow,
  ChevronDown,
  Sparkles
} from 'lucide-react';

const HomePage = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/login');
  };

  const handleStartTrial = () => {
    navigate('/register');
  };

  const handleWatchDemo = () => {
    // Could open a modal or navigate to demo page
    console.log('Open demo video');
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/80 backdrop-blur-sm z-40">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="w-3 h-3 bg-blue-600 rounded-full group-hover:scale-110 transition-transform"></div>
              <div className="w-8 h-0.5 bg-blue-600 group-hover:w-12 transition-all"></div>
              <span className="text-xl font-light text-gray-900 group-hover:text-blue-600 transition-colors">
                StockFlow
              </span>
            </div>
            
            <nav className="hidden md:flex items-center space-x-8">
              <button 
                onClick={() => scrollToSection('solutions')}
                className="text-gray-600 hover:text-blue-600 cursor-pointer text-sm transition-colors group relative"
              >
                Solutions
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all"></div>
              </button>
              
              <button 
                onClick={() => scrollToSection('features')}
                className="text-gray-600 hover:text-blue-600 cursor-pointer text-sm transition-colors group relative"
              >
                Features
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all"></div>
              </button>
              
              <div className="relative group">
                <button className="text-gray-600 hover:text-blue-600 cursor-pointer text-sm transition-colors flex items-center space-x-1">
                  <span>Resources</span>
                  <ChevronDown className="w-3 h-3 group-hover:rotate-180 transition-transform" />
                </button>
                <div className="absolute top-full left-0 mt-2 w-48 bg-white border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200">
                  <button 
                    onClick={() => navigate('/login')}
                    className="block w-full text-left px-4 py-2 cursor-pointer text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Customer Login
                  </button>
                  <button 
                    onClick={() => navigate('/register')}
                    className="block w-full text-left px-4 py-2 cursor-pointer  text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-colors"
                  >
                    Create Account
                  </button>
                </div>
              </div>
            </nav>
            
            <button 
              onClick={handleGetStarted}
              className="text-blue-600 border border-blue-600 px-4 py-2 text-sm hover:bg-blue-50 hover:text-white cursor-pointer transition-colors group relative overflow-hidden"
            >
              <span className="relative z-10">Get Started</span>
              <div className="absolute inset-0 bg-blue-600 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left"></div>
            </button>
          </div>
        </div>
      </header>

      {/* Hero - Asymmetric Layout */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-5 gap-12 items-center">
            {/* Left Content - 3/5 width */}
            <div className="lg:col-span-3">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-px bg-blue-600"></div>
                <span className="text-blue-600 text-sm uppercase tracking-wide flex items-center space-x-2">
                  <Sparkles className="w-3 h-3" />
                  <span>Inventory Intelligence</span>
                </span>
              </div>
              
              <h1 className="text-5xl md:text-6xl font-light text-gray-900 mb-6 leading-tight">
                Inventory
                <br />
                <span className="text-blue-600">perfected</span>
              </h1>
              
              <p className="text-lg text-gray-600 mb-8 max-w-xl leading-relaxed">
                Streamline your inventory management with precision tools designed for modern businesses. 
                No complexity, just results.
              </p>

              <div className="flex items-center space-x-4">
                <button 
                  onClick={handleStartTrial}
                  className="bg-blue-600 text-white px-8 py-3 text-sm hover:bg-blue-700 transition-colors flex items-center space-x-2 group"
                >
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </button>
                
                <button 
                  onClick={handleWatchDemo}
                  className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors group"
                >
                  <div className="w-8 h-8 border border-gray-300 rounded-full flex items-center justify-center group-hover:border-blue-600 transition-colors">
                    <Play className="w-3 h-3" />
                  </div>
                  <span className="text-sm">Watch Demo</span>
                </button>
              </div>

              {/* Quick Stats */}
              <div className="flex items-center space-x-6 mt-8 pt-8 border-t border-gray-100">
                {[
                  { number: '14-day', label: 'free trial' },
                  { number: '5min', label: 'setup' },
                  { number: '0', label: 'credit card' }
                ].map((stat, index) => (
                  <div key={index} className="text-center">
                    <div className="text-sm font-medium text-gray-900">{stat.number}</div>
                    <div className="text-xs text-gray-500">{stat.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Visual - 2/5 width */}
            <div className="lg:col-span-2">
              <div 
                className="bg-blue-50 p-8 cursor-pointer group"
                onClick={handleStartTrial}
              >
                <div className="space-y-4">
                  {/* Animated data visualization mockup */}
                  <div className="flex items-end space-x-2 h-20">
                    {[8, 12, 16, 20, 14].map((height, index) => (
                      <div 
                        key={index}
                        className="w-6 bg-blue-200 group-hover:bg-blue-300 transition-colors"
                        style={{ height: `${height * 4}px` }}
                      ></div>
                    ))}
                  </div>
                  <div className="text-center">
                    <div className="text-sm text-blue-900 font-medium mb-1">
                      Real-time stock levels
                    </div>
                    <div className="text-xs text-blue-700 opacity-70">
                      Click to explore dashboard
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Solutions - Vertical Timeline Style */}
      <section id="solutions" className="py-20 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-light text-gray-900 mb-4">For Every Business Need</h2>
            <div className="w-16 h-px bg-blue-600 mx-auto"></div>
          </div>

          <div className="space-y-12">
            {[
              {
                icon: <Store className="w-6 h-6" />,
                title: "Retail Stores",
                description: "Manage multiple locations with real-time synchronization and automated replenishment.",
                action: "Explore Retail →"
              },
              {
                icon: <Building className="w-6 h-6" />,
                title: "Manufacturing",
                description: "Track raw materials and finished goods across your production lifecycle.",
                action: "Explore Manufacturing →"
              },
              {
                icon: <Truck className="w-6 h-6" />,
                title: "E-commerce",
                description: "Sync inventory across all sales channels and automate order fulfillment.",
                action: "Explore E-commerce →"
              }
            ].map((solution, index) => (
              <div 
                key={index} 
                className="flex items-start space-x-6 group cursor-pointer hover:bg-white p-6 rounded-lg transition-colors"
                onClick={handleStartTrial}
              >
                <div className="w-12 h-12 bg-blue-50 flex items-center justify-center shrink-0 group-hover:bg-blue-100 transition-colors">
                  <div className="text-blue-600">
                    {solution.icon}
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-normal text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {solution.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-3">{solution.description}</p>
                  <button className="text-blue-600 text-sm font-medium opacity-0 group-hover:opacity-100 transition-opacity">
                    {solution.action}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features - Grid with Lines */}
      <section id="features" className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            {/* Left Column */}
            <div>
              <div className="mb-12">
                <div className="w-12 h-0.5 bg-blue-600 mb-4"></div>
                <h3 className="text-2xl font-normal text-gray-900 mb-4">Smart Automation</h3>
                <p className="text-gray-600">
                  Let our system handle the routine while you focus on growth. Automated reordering, 
                  stock alerts, and reporting.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  "Predictive stock alerts",
                  "Automated purchase orders", 
                  "Real-time sync across locations",
                  "Custom reporting dashboards"
                ].map((feature, index) => (
                  <div 
                    key={index} 
                    className="flex items-center space-x-3 group cursor-pointer"
                    onClick={handleStartTrial}
                  >
                    <CheckCircle className="w-5 h-5 text-blue-600 group-hover:scale-110 transition-transform" />
                    <span className="text-gray-700 group-hover:text-blue-600 transition-colors">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div>
              <div className="border-l border-gray-200 pl-8 space-y-12">
                {[
                  {
                    icon: <Database className="w-5 h-5" />,
                    title: "Centralized Data",
                    description: "All your inventory data in one place, accessible from anywhere."
                  },
                  {
                    icon: <Workflow className="w-5 h-5" />,
                    title: "Workflow Tools",
                    description: "Customizable processes that match your business operations."
                  },
                  {
                    icon: <BarChart3 className="w-5 h-5" />,
                    title: "Business Insights",
                    description: "Clear reports that help you make informed decisions."
                  }
                ].map((feature, index) => (
                  <div 
                    key={index}
                    className="group cursor-pointer"
                    onClick={handleStartTrial}
                  >
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-blue-600 group-hover:scale-110 transition-transform">
                        {feature.icon}
                      </div>
                      <h4 className="font-normal text-gray-900 group-hover:text-blue-600 transition-colors">
                        {feature.title}
                      </h4>
                    </div>
                    <p className="text-gray-600 text-sm group-hover:text-gray-700 transition-colors">
                      {feature.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof - Minimal */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <p className="text-gray-600 text-sm uppercase tracking-wide mb-4">Trusted by forward-thinking companies</p>
            <div className="w-20 h-px bg-gray-300 mx-auto"></div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center opacity-60">
            {['TechCorp', 'UrbanGoods', 'SwiftRetail', 'PrimeSupply'].map((company, index) => (
              <div key={index} className="text-center group cursor-pointer">
                <div className="text-gray-800 font-light text-lg group-hover:text-blue-600 transition-colors">
                  {company}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Simple */}
      <section className="py-20 px-6">
        <div className="max-w-2xl mx-auto text-center">
          <h2 className="text-3xl font-light text-gray-900 mb-4">
            Ready to simplify your inventory?
          </h2>
          <p className="text-gray-600 mb-8">
            Start your free trial today. No credit card required.
          </p>
          <button 
            onClick={handleStartTrial}
            className="bg-blue-600 text-white px-8 py-3 text-sm hover:bg-blue-700 transition-colors mx-auto block"
          >
            Begin Free Trial
          </button>
          
          {/* Alternative login option */}
          <div className="mt-6">
            <button 
              onClick={() => navigate('/login')}
              className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
            >
              Already have an account? <span className="font-medium">Sign in</span>
            </button>
          </div>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div 
              className="flex items-center space-x-3 cursor-pointer group"
              onClick={() => navigate('/')}
            >
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-900 group-hover:text-blue-600 transition-colors">StockFlow</span>
            </div>
            
            <div className="flex items-center space-x-6">
              <button 
                onClick={() => navigate('/login')}
                className="text-gray-600 hover:text-blue-600 text-sm transition-colors"
              >
                Sign In
              </button>
              <button 
                onClick={() => navigate('/register')}
                className="text-blue-600 text-sm font-medium"
              >
                Create Account
              </button>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;