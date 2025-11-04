import React, { useState } from 'react';

const PdfViewer = ({ pdfUrl, title = "PDF Document" }) => {
  const [showViewer, setShowViewer] = useState(false);

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = title;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <>
      {/* PDF Viewer Modal */}
      {showViewer && (
        <div className="pdf-viewer-overlay" onClick={() => setShowViewer(false)}>
          <div className="pdf-viewer-modal" onClick={(e) => e.stopPropagation()}>
            <div className="pdf-viewer-header">
              <h3>{title}</h3>
              <div className="pdf-viewer-controls">
                <button 
                  onClick={handleDownload}
                  className="pdf-download-btn"
                  title="Download PDF"
                >
                  📥 Download
                </button>
                <button 
                  onClick={() => setShowViewer(false)}
                  className="pdf-close-btn"
                  title="Close"
                >
                  ×
                </button>
              </div>
            </div>
            <div className="pdf-viewer-content">
              <iframe
                src={pdfUrl}
                title={title}
                className="pdf-iframe"
                width="100%"
                height="100%"
              />
            </div>
          </div>
        </div>
      )}

      {/* PDF Display Component */}
      <div className="pdf-display-card">
        <div className="pdf-preview">
          <div className="pdf-icon">📄</div>
          <div className="pdf-info">
            <h4>{title}</h4>
            <p>Training agenda and details</p>
          </div>
        </div>
        <div className="pdf-actions">
          <button 
            onClick={() => setShowViewer(true)}
            className="pdf-view-btn"
          >
            👁️ View PDF
          </button>
          <button 
            onClick={handleDownload}
            className="pdf-download-btn-main"
          >
            📥 Download
          </button>
        </div>
      </div>

      <style jsx>{`
        .pdf-viewer-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.8);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 9999;
          padding: 20px;
        }

        .pdf-viewer-modal {
          background: white;
          border-radius: 8px;
          width: 90%;
          height: 90%;
          max-width: 1200px;
          max-height: 800px;
          display: flex;
          flex-direction: column;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .pdf-viewer-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1rem 1.5rem;
          border-bottom: 1px solid #e2e8f0;
          background: #f7f7f9;
          border-radius: 8px 8px 0 0;
        }

        .pdf-viewer-header h3 {
          margin: 0;
          color: #2c3548;
          font-size: 18px;
          font-weight: 600;
        }

        .pdf-viewer-controls {
          display: flex;
          gap: 0.5rem;
        }

        .pdf-download-btn,
        .pdf-close-btn {
          padding: 0.5rem 1rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 500;
          transition: all 0.3s ease;
        }

        .pdf-download-btn {
          background: #2c3548;
          color: white;
        }

        .pdf-download-btn:hover {
          background: #1f2937;
        }

        .pdf-close-btn {
          background: #f2867d;
          color: white;
          font-size: 18px;
          width: 36px;
          height: 36px;
          display: flex;
          align-items: center;
          justify-content: center;
        }

        .pdf-close-btn:hover {
          background: #e57368;
        }

        .pdf-viewer-content {
          flex: 1;
          padding: 0;
          border-radius: 0 0 8px 8px;
        }

        .pdf-iframe {
          border: none;
          border-radius: 0 0 8px 8px;
        }

        .pdf-display-card {
          background: white;
          border: 1px solid #e2e8f0;
          border-radius: 8px;
          padding: 1.5rem;
          margin: 1rem 0;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
          transition: transform 0.3s ease;
        }

        .pdf-display-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 4px 16px rgba(0, 0, 0, 0.15);
        }

        .pdf-preview {
          display: flex;
          align-items: center;
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .pdf-icon {
          font-size: 48px;
          width: 60px;
          height: 60px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f7f7f9;
          border-radius: 8px;
          border: 2px solid #2c3548;
        }

        .pdf-info h4 {
          margin: 0 0 0.25rem 0;
          color: #2c3548;
          font-size: 18px;
          font-weight: 600;
        }

        .pdf-info p {
          margin: 0;
          color: #6b7280;
          font-size: 14px;
        }

        .pdf-actions {
          display: flex;
          gap: 0.75rem;
        }

        .pdf-view-btn,
        .pdf-download-btn-main {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 6px;
          cursor: pointer;
          font-size: 14px;
          font-weight: 600;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .pdf-view-btn {
          background: transparent;
          color: #2c3548;
          border: 2px solid #2c3548;
        }

        .pdf-view-btn:hover {
          background: #2c3548;
          color: white;
        }

        .pdf-download-btn-main {
          background: #2c3548;
          color: white;
        }

        .pdf-download-btn-main:hover {
          background: #1f2937;
          transform: translateY(-1px);
        }

        @media (max-width: 767px) {
          .pdf-viewer-modal {
            width: 95%;
            height: 95%;
            margin: 10px;
          }

          .pdf-viewer-header {
            padding: 0.75rem 1rem;
          }

          .pdf-viewer-header h3 {
            font-size: 16px;
          }

          .pdf-display-card {
            padding: 1rem;
          }

          .pdf-preview {
            flex-direction: column;
            text-align: center;
            gap: 0.75rem;
          }

          .pdf-actions {
            flex-direction: column;
          }

          .pdf-view-btn,
          .pdf-download-btn-main {
            width: 100%;
            justify-content: center;
          }
        }
      `}</style>
    </>
  );
};

export default PdfViewer;





