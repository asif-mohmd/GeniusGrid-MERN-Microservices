import React from 'react';

interface PurchaseContentsProps {
  selectedVideoLinks: string[] | null;
}

const Resources: React.FC<PurchaseContentsProps> = ({ selectedVideoLinks }) => {
  return (
    <div className="">
      <h3 className="text-lg font-semibold mb-4">Video Links:</h3>
      <ul>
        {selectedVideoLinks && selectedVideoLinks.map((link, index) => (
          <li key={index} className="mb-2">
            <a href={link} target="_blank" rel="noopener noreferrer" className="text-blue-500 hover:underline">{link}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Resources;
