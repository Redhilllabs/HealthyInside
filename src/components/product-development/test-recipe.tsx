import React, { useState } from 'react';
import { Button, Modal ,ScrollArea  } from '@mantine/core'; // Import Modal from @mantine/core
import { useDisclosure } from '@mantine/hooks';

const TestRecipe = () => {
  const [opened, { open, close }] = useDisclosure(false);
  const [modalContent, setModalContent] = useState<string[]>([]);
  const OpenRecipesList = (value: string) => {
    //  here call the API to Fetch the DATA for the Value 
    setModalContent([
        'Recipe1','Recipe2', 'Recipe3','Recipe4','Recipe5', 'Recipe6','Recipe6'
    ])
    open();
  };

  const renderButton = (label: string) => (
    <div className="m-3">
      <Button color="blue" size="md" compact uppercase onClick={() => OpenRecipesList(label)}>
        {label}
      </Button>
    </div>
  );

  return (
    <div className="container">
      <Modal opened={opened} onClose={close} title="LIST"  size="55%"   scrollAreaComponent={ScrollArea.Autosize} transitionProps={{ transition: 'fade', duration: 200 }}>
{modalContent.map((item ,index)=>(
    <div key={index} className="list bg-primary text-center m-1 text-white" onClick={()=>alert(item)}>
<p>{item}</p>
    </div>
))}
      </Modal>
      <div className="d-flex">
        {renderButton('New Recipes')}
        {renderButton('Tested Recipe')}
        {renderButton('In-Test Recipes')}
        {renderButton('Rejected Recipe')}
        {renderButton('Incomplete Data')}
      </div>
    </div>
  );
};

export default TestRecipe;
