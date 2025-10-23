import React from 'react';
import { 
  ArrowRight, 
  CheckCircle,
  Play,
  Building,
  Store,
  Truck,
  BarChart3,
  Database,
  Workflow
} from 'lucide-react';

const HomePage = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Minimal Header */}
      <header className="border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <div className="w-8 h-0.5 bg-blue-600"></div>
              <span className="text-xl font-light text-gray-900">StockFlow</span>
            </div>
            <nav className="hidden md:flex items-center space-x-8">
              <a href="#solutions" className="text-gray-600 hover:text-blue-600 text-sm">Solutions</a>
              <a href="#features" className="text-gray-600 hover:text-blue-600 text-sm">Features</a>
              <a href="#customers" className="text-gray-600 hover:text-blue-600 text-sm">Customers</a>
            </nav>
            <button className="text-blue-600 border border-blue-600 px-4 py-2 text-sm hover:bg-blue-50 transition-colors">
              Get Started
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
                <span className="text-blue-600 text-sm uppercase tracking-wide">Inventory Intelligence</span>
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
                <button className="bg-blue-600 text-white px-8 py-3 text-sm hover:bg-blue-700 transition-colors flex items-center space-x-2">
                  <span>Start Free Trial</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
                <button className="flex items-center space-x-2 text-gray-600 hover:text-blue-600 transition-colors">
                  <Play className="w-4 h-4" />
                  <span className="text-sm">Watch Demo</span>
                </button>
              </div>
            </div>

            {/* Right Visual - 2/5 width */}
            <div className="lg:col-span-2">
              <div className="bg-blue-50 p-8">
                <div className="space-y-4">
                  {/* Simple data visualization mockup */}
                  <div className="flex items-end space-x-2 h-20">
                    <div className="w-6 bg-blue-200 h-8"></div>
                    <div className="w-6 bg-blue-300 h-12"></div>
                    <div className="w-6 bg-blue-400 h-16"></div>
                    <div className="w-6 bg-blue-500 h-20"></div>
                    <div className="w-6 bg-blue-600 h-14"></div>
                  </div>
                  <div className="text-center text-sm text-blue-900">
                    Real-time stock levels
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
                color: "blue"
              },
              {
                icon: <Building className="w-6 h-6" />,
                title: "Manufacturing",
                description: "Track raw materials and finished goods across your production lifecycle.",
                color: "green"
              },
              {
                icon: <Truck className="w-6 h-6" />,
                title: "E-commerce",
                description: "Sync inventory across all sales channels and automate order fulfillment.",
                color: "purple"
              }
            ].map((solution, index) => (
              <div key={index} className="flex items-start space-x-6">
                <div className={`w-12 h-12 bg-${solution.color}-50 flex items-center justify-center shrink-0`}>
                  <div className={`text-${solution.color}-600`}>
                    {solution.icon}
                  </div>
                </div>
                <div>
                  <h3 className="text-xl font-normal text-gray-900 mb-2">{solution.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{solution.description}</p>
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
                  <div key={index} className="flex items-center space-x-3">
                    <CheckCircle className="w-5 h-5 text-blue-600" />
                    <span className="text-gray-700">{feature}</span>
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
                  <div key={index}>
                    <div className="flex items-center space-x-3 mb-2">
                      <div className="text-blue-600">{feature.icon}</div>
                      <h4 className="font-normal text-gray-900">{feature.title}</h4>
                    </div>
                    <p className="text-gray-600 text-sm">{feature.description}</p>
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
              <div key={index} className="text-center">
                <div className="text-gray-800 font-light text-lg">{company}</div>
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
          <button className="bg-blue-600 text-white px-8 py-3 text-sm hover:bg-blue-700 transition-colors">
            Begin Free Trial
          </button>
        </div>
      </section>

      {/* Minimal Footer */}
      <footer className="border-t border-gray-100 py-12 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
              <span className="text-gray-900">StockFlow</span>
            </div>
            <div className="text-sm text-gray-600">
              © 2024 StockFlow. All rights reserved.
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;