import React, { useState } from 'react';
import {
    Avatar,
    Box,
    Button,
    Container,
    Checkbox,
    CssBaseline,
    FormControl,
    FormControlLabel,
    Grid,
    InputLabel,
    Link,
    MenuItem,
    Select,
    TextField,
    Typography,
    OutlinedInput,
} from '@mui/material';
import InputAdornment from '@mui/material/InputAdornment';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Calendar from '../../components/Calendar';
import AvatarSelector from '../../components/AvatarSelect';

// TODO remove, this demo shouldn't need to reset the theme.
const defaultTheme = createTheme();

export default function RegisterPage() {
    const handleSubmit = (event) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        console.log({
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            email: data.get('email'),
            password: data.get('password'),
            allowExtraEmails: data.get('allowExtraEmails'),
        });
    };
    const [Uni, setUni] = useState('');

    const handleUniChange = (event) => {
        setUni(event.target.value);
    };


    return (

        <Container component="main" maxWidth="xs" sx={{
            marginTop: '50px',
            bgcolor: 'primary.main',
            height: '100vh',
            borderTopLeftRadius: 20,
            borderTopRightRadius: 20,
            borderBottomLeftRadius: 20,
            borderBottomRightRadius: 20,
            paddingBottom: 5,
        }}>
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    width: 400,
                }}
            >
                <Avatar sx={{ marginTop: 10, bgcolor: 'indigo', color: 'white', marginBottom:1, }}>
                    <AccountBalanceIcon />
                </Avatar>

                <Typography component="h1" variant="h5">
                    Verify your Uni Account
                </Typography>
                <ThemeProvider theme={defaultTheme}>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12} sx={{ width:'300px' }}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Uni Email Address"
                                    name="email"
                                    autoComplete="email"
                                    
                                />
                            </Grid>
                            <Grid item xs={12} sx={{ width:'300px' }}>
                                <FormControl fullWidth required>
                                    <InputLabel id="Uni-label" >University</InputLabel>
                                    <Select
                                        labelId="Uni-label"
                                        id="Uni"
                                        value={Uni}
                                        input={<OutlinedInput label="Uni" />}
                                        onChange={handleUniChange}
                                        autoComplete="Uni"
                                    >
                                        <MenuItem value="">Select your Uni</MenuItem>
                                        {UniOptions.map((option) => (
                                            <MenuItem key={option.value} value={option.value}>
                                                {option.label}
                                            </MenuItem>
                                        ))}
                                    </Select>
                                </FormControl>
                            </Grid>

                        </Grid>
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            sx={{ mt: 5, mb: 2, borderRadius: 2, bgcolor: 'rgb(255,207,96)', color: '#808080', '&:hover': {
                                bgcolor: 'rgb(255,199,71)',
                                color: '#382e7f',
                              },}}
                            href='/'
                        >
                            Verify
                        </Button>
                    </Box>
                </ThemeProvider>
            </Box>
            <Copyright />
        </Container>
    );
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            <Link href="/" variant="body2" sx={{
                textDecoration: 'none', color: '#1C89B6', '&:hover': {
                    textDecoration: 'underline',
                    color: '#1c69b6',
                },
            }}>
                {'Verify Later'}
            </Link>
        </Typography>
    );
}


const UniOptions = [
    { value: 'AUT', label: 'Auckland University of Technology' },
    { value: 'Lincoln', label: 'Lincoln University' },
    { value: 'Massey', label: 'Massey University' },
    { value: 'UOA', label: 'University of Auckland' },
    { value: 'Canterbury', label: 'University of Canterbury' },
    { value: 'Otago', label: 'University of Otago' },
    { value: 'Waikato', label: 'University of Waikato' },
    { value: 'VUW', label: 'Victoria University of Wellington' },
];
