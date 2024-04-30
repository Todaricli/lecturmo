import React, { useState, useContext, useEffect } from 'react';
import Navbar from '../../components/Navbar/Navbar';
import { Flex, Text, Button, Box, Card } from '@radix-ui/themes';
import { AppContext } from '../../contexts/AppContextProvider';

const HomePage = () => {
  const { updateData, getData } = useContext(AppContext);
  const [count, setCount] = useState(0);
  const handleIncrement = () => {
    setCount(count + 1);
  };

  useEffect(() => {
    updateData('user', { name: 'John Doe', age: 30 });
    console.log("getData('user'):", getData('user'));
  }, []);

  return (
    <>
      <Navbar />

      <div className="flex flex-col items-center justify-center h-screen">
        <Flex direction="column" gap="2">
          <Text className="font-bold">Hello World</Text>
          <Button onClick={handleIncrement}>Clicked {count} times</Button>
        </Flex>
        <Box className="w-80">
          <Card asChild>
            <a href="#">
              <Text as="div" size="2" weight="bold">
                Quick start
              </Text>
              <Text as="div" color="gray" size="2">
                Start building your next project in minutes
              </Text>
            </a>
          </Card>
        </Box>
      </div>
    </>
  );
};

export default HomePage;
