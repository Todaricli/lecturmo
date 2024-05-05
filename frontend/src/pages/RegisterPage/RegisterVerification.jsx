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
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
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
                    <Avatar sx={{ m: 1, bgcolor: 'indigo' }}>
                        <AccountBalanceIcon />
                    </Avatar>

                    <Typography component="h1" variant="h5">
                        Verify your Uni Account
                    </Typography>
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <Grid item xs={12}>
                                <TextField
                                    required
                                    fullWidth
                                    id="email"
                                    label="Email Address"
                                    name="email"
                                    autoComplete="email"
                                />
                            </Grid>
                            <Grid item xs={12}>
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
                            sx={{ mt: 3, mb: 2 }}
                            href='/'
                        >
                            Verify
                        </Button>
                        <Grid container justifyContent="flex-end">
                            <Grid item>
                                <Link href="/" variant="body2">
                                    Verify Later
                                </Link>
                            </Grid>
                        </Grid>
                    </Box>
                </Box>
                <Copyright />
            </Container>
        </ThemeProvider>
    );
}

function Copyright(props) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" {...props}>
            {'Copyright © '}
            <Link color="inherit">
                Lectermo
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
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
