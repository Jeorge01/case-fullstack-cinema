import React, { useState } from 'react';

function showButtons() {
    const options = ["Option 1", "Option 2", "Option 3", "Option 4", "Option 5"]
    const [selectedOption, setSelectedOption] = useState(null);
  
    const handleShowChange = (e) => {
      setSelectedOption(e.target.value);
    };


}

export default showButtons;