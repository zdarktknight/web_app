import React from 'react';

interface RightDisplayProps {
    results: Array<any>;
}

const RightDisplay: React.FC<RightDisplayProps> = ({ results }) => {
    return (
        <div className="right-display">
            {results.length === 0 ? (
                <p>No results to display.</p>
            ) : (
                results.map((result, index) => (
                    <div key={index} className="result-item">
                        {/* Customize the display of each result as needed */}
                        <h3>Result {index + 1}</h3>
                        <pre>{JSON.stringify(result, null, 2)}</pre>
                    </div>
                ))
            )}
        </div>
    );
};

export default RightDisplay;