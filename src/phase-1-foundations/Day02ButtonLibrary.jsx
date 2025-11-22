import { Download, Trash2, Plus, Send, Loader2 } from "lucide-react";
import { useState, Children, cloneElement } from "react";

function Button({
  children, // The text inside button
  variant = "primary", // Default variant
  size = "md", // Default size
  isLoading = false,
  disabled = false,
  icon, // Optional icon
  onClick,
  rounds = "full",
}) {
  const variants = {
    primary:
      "bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md shadow-blue-500/40",
    secondary:
      "bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600",
    danger:
      "bg-gradient-to-r from-red-500 to-red-600 text-white hover:from-red-600 hover:to-red-700 shadow-lg shadow-red-500/50",
    success:
      "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700 shadow-lg shadow-green-500/50",
    outline:
      "border-2 border-blue-500 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-950",
    ghost:
      "text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800",
    warning:
      "bg-gradient-to-r from-yellow-500 to-orange-500 text-white shadow-md shadow-yellow-500/50",
  };
  // After variants object:
  const sizes = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-6 py-3 text-lg",
    xl: "px-8 py-4 text-xl",
  };

  const rounded = {
    left: "rounded-l-lg",
    right: "rounded-r-lg",
    none: "rounded-none",
    full: "rounded-lg",
  };
  const disabledStyles = "opacity-50 cursor-not-allowed";

  return (
    <button
      onClick={onClick}
      disabled={disabled || isLoading}
      className={`
       font-medium transition-all duration-200
        flex items-center gap-2 justify-center
        ${rounded[rounds]}
        ${variants[variant]}
        ${sizes[size]}
        ${disabled || isLoading ? disabledStyles : ""}
        ${!children && icon ? "aspect-square" : ""}
      `}
    >
      {isLoading ? (
        <Loader2 size={18} className="animate-spin" />
      ) : icon ? (
        icon
      ) : null}

      {children}
    </button>
  );
}

const ButtonGroup = ({ children }) => {
  const childrenArray = Children.toArray(children);

  return (
    <div className={`flex pb-4`}>
      {childrenArray.map((child, index) => {
        const isFirst = index === 0;
        const isLast = index === childrenArray.length - 1;

        return cloneElement(child, {
          ...child.props,
          rounds: isFirst ? "left" : isLast ? "right" : "none",
          key: index,
          className: `${child.props.className || ""} ${
            !isFirst ? "-ml-px" : ""
          }`,
        });
      })}
    </div>
  );
};

const Day02ButtonLibrary = () => {
  const [loadingBtn, setLoadingBtn] = useState(null);
  const [activeBtn, setActiveBtn] = useState('all');

  const handleClick = (btnName) => {
    setLoadingBtn(btnName);
    setTimeout(() => setLoadingBtn(null), 2000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 p-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-white mb-2">
            Button Component Library
          </h1>
          <p className="text-gray-400">
            Reusable, accessible, and beautiful buttons for any project
          </p>
        </div>
        {/* Variants Section */}
        <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Variants</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              onClick={() => handleClick("primary")}
              isLoading={loadingBtn === "primary"}
            >
              Primary
            </Button>
            <Button icon={<Plus size={20} />} variant="primary"></Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="danger" icon={<Trash2 size={18} />}>
              Danger
            </Button>
            <Button variant="success" icon={<Plus size={18} />}>
              Success
            </Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="warning">Warning</Button>
          </div>
        </div>

        {/* Sizes Section */}
        <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Sizes</h2>
          <div className="flex flex-wrap items-center gap-4">
            <Button size="sm" variant="primary">
              Small
            </Button>
            <Button size="md" variant="secondary">
              Medium
            </Button>
            <Button size="lg" variant="primary">
              Large
            </Button>
            <Button size="xl" variant="warning">
              Large
            </Button>
          </div>
        </div>

        {/* With Icons Section */}
        <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">With Icons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary" icon={<Download size={18} />}>
              Download
            </Button>
            <Button variant="danger" icon={<Trash2 size={18} />}>
              Delete
            </Button>
            <Button variant="success" icon={<Plus size={18} />}>
              Create New
            </Button>
            <Button variant="outline" icon={<Send size={18} />}>
              Send Message
            </Button>
          </div>
        </div>

        {/* States Section */}
        <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">States</h2>
          <div className="flex flex-wrap gap-4">
            <Button
              variant="primary"
              isLoading={loadingBtn === "loading"}
              onClick={() => handleClick("loading")}
            >
              {loadingBtn === "loading" ? "Loading..." : "Click to Load"}
            </Button>
            <Button variant="secondary" disabled>
              Disabled
            </Button>
            <Button variant="danger" disabled icon={<Trash2 size={18} />}>
              Disabled with Icon
            </Button>
          </div>
        </div>

        <div className="bg-gray-800/50 backdrop-blur rounded-2xl p-8 mb-8">
          <h2 className="text-2xl font-bold text-white mb-6">Button group</h2>
          <ButtonGroup >
            <Button size="sm">Left</Button>
            <Button size="sm">Middle</Button>
            <Button size="sm">Right</Button>
          </ButtonGroup>
          <ButtonGroup>
  <Button 
    variant={activeBtn === 'all' ? 'primary' : 'secondary'}
    onClick={() => setActiveBtn('all')}
  >
    All
  </Button>
  <Button 
    variant={activeBtn === 'active' ? 'primary' : 'secondary'}
    onClick={() => setActiveBtn('active')}
  >
    Active
  </Button>
  <Button 
    variant={activeBtn === 'active2' ? 'primary' : 'secondary'}
    onClick={() => setActiveBtn('active2')}
  >
    Active2
  </Button>
</ButtonGroup>
        </div>
      </div>
    </div>
  );
};

export default Day02ButtonLibrary;
