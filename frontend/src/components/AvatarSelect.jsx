import React, { useState } from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';

export default function AvatarSelect() {
  const [avatar, setAvatar] = useState('');
  const handleChange = (event) => {
    setAvatar(event.target.value);
  };

  return (
    <FormControl>
      <FormLabel id="avatar">Choose your avatar*</FormLabel>
      <ImageList sx={{ height: 350, border: '1px solid #ccc' }} cols={4}>
        {itemData.map((item, index) => (
          <ImageListItem
            key={index}
            sx={{
              cursor: 'pointer',
              ...(avatar === index && { backgroundColor: 'lightgray' }),
            }}
          >
            <RadioGroup
              aria-labelledby="avatar-group"
              name="avatar-group"
              value={avatar}
              onClick={() => setAvatar(index)}
              sx={{ '&:hover': { backgroundColor: 'lightgrey' } }}
            >
              <FormControlLabel
                control={<Radio style={{ display: 'none' }} />}
                label={
                  <div>
                    <img
                      srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                      src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                      alt={item.title}
                      loading="lazy"
                    />
                  </div>
                }
                sx={{ paddingLeft: 3, paddingBottom: 1, paddingTop: 1 }}
              />
            </RadioGroup>
          </ImageListItem>
        ))}
      </ImageList>
    </FormControl>
  );
}

const itemData = [
  {
    img: '/assets/Avatar/cat1.png',
    title: 'Cat1 1',
  },
  {
    img: '/assets/Avatar/cat2.png',
    title: 'Cat 2',
  },
  {
    img: '/assets/Avatar/cat3.png',
    title: 'Cat 3',
  },
  {
    img: '/assets/Avatar/cat4.png',
    title: 'Cat 4',
  },
  {
    img: '/assets/Avatar/dog1.png',
    title: 'Dog 1',
  },
  {
    img: '/assets/Avatar/dog2.png',
    title: 'Dog 2',
  },
  {
    img: '/assets/Avatar/bird1.png',
    title: 'Bird 1',
  },
  {
    img: '/assets/Avatar/sheep1.png',
    title: 'Sheep 1',
  },
  {
    img: '/assets/Avatar/goat1.png',
    title: 'Goat 1',
  },
  {
    img: '/assets/Avatar/girl1.png',
    title: 'Girl 1',
  },
  {
    img: '/assets/Avatar/girl2.png',
    title: 'Girl 2',
  },
  {
    img: '/assets/Avatar/girl3.png',
    title: 'Girl 3',
  },
  {
    img: '/assets/Avatar/girl4.png',
    title: 'Girl 4',
  },
  {
    img: '/assets/Avatar/girl5.png',
    title: 'Girl 5',
  },
  {
    img: '/assets/Avatar/girl6.png',
    title: 'Girl 6',
  },
  {
    img: '/assets/Avatar/girl7.png',
    title: 'Girl 7',
  },
  {
    img: '/assets/Avatar/girl8.png',
    title: 'Girl 8',
  },
  {
    img: '/assets/Avatar/boy1.png',
    title: 'Boy 1',
  },
  {
    img: '/assets/Avatar/boy2.png',
    title: 'Boy 2',
  },
  {
    img: '/assets/Avatar/boy3.png',
    title: 'Boy 3',
  },
  {
    img: '/assets/Avatar/boy4.png',
    title: 'Boy 4',
  },
  {
    img: '/assets/Avatar/boy5.png',
    title: 'Boy 5',
  },
  {
    img: '/assets/Avatar/boy6.png',
    title: 'Boy 6',
  },
  {
    img: '/assets/Avatar/boy7.png',
    title: 'Boy 7',
  },
  {
    img: '/assets/Avatar/boy8.png',
    title: 'Boy 8',
  },
];
