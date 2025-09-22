import type { MDXComponents } from "mdx/types";

const InfoBox = ({ children, type }: { children: React.ReactNode; type: 'info' | 'warning' | 'danger' }) => {
  const styles = {
    info: {
      background: 'rgba(59, 130, 246, 0.1)',
      borderLeft: '4px solid #3b82f6',
      color: 'var(--color5)'
    },
    warning: {
      background: 'rgba(245, 158, 11, 0.1)', 
      borderLeft: '4px solid #f59e0b',
      color: 'var(--color5)'
    },
    danger: {
      background: 'rgba(239, 68, 68, 0.1)',
      borderLeft: '4px solid #ef4444', 
      color: 'var(--color5)'
    }
  };

  return (
    <div style={{
      ...styles[type],
      padding: '16px 20px',
      margin: '20px 0',
      borderRadius: '8px',
      fontSize: 'calc(var(--fontSize) + 1px)'
    }}>
      {children}
    </div>
  );
};

const components: MDXComponents = {
  // Handle VitePress-style containers
  div: ({ className, children, ...props }) => {
    if (className === 'info') {
      return <InfoBox type="info">{children}</InfoBox>;
    }
    if (className === 'warning') {
      return <InfoBox type="warning">{children}</InfoBox>;
    }
    if (className === 'danger') {
      return <InfoBox type="danger">{children}</InfoBox>;
    }
    return <div className={className} {...props}>{children}</div>;
  },
};

export function useMDXComponents(): MDXComponents {
  return components;
}
