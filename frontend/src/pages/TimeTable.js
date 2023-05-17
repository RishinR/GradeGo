import React, { useState, useEffect } from 'react';
import { Button, MenuItem, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Select, Typography, TextField } from '@mui/material';


const Timetable = () => {
    const [data, setData] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('localhost:1337/login'); // Replace '/api/data' with your actual API endpoint
                if (response.ok) {
                    const jsonData = await response.json();
                    setData(jsonData);
                } else {
                    console.error('Error fetching data:', response.status);
                }
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);



    const saveTimetable = async () => {
        try {
            const response = await fetch('/api/save-timetable', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    _id: data._id,
                    batch: data.batch,
                    days: days.map((day) => ({
                        day: day,
                        periods: periods.map((period) => ({
                            periodNumber: period,
                            abbreviation: getPeriodAbbreviation(day, period),
                        })),
                    })),
                }),
            });

            if (response.ok) {
                console.log('Timetable saved successfully');
                // Do something on success
            } else {
                console.error('Error saving timetable:', response.status);
            }
        } catch (error) {
            console.error('Error saving timetable:', error);
        }
    };



    const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    const periods = Array.from(Array(7), (_, index) => index + 1);

    const [timetable, setTimetable] = useState([]);
    const [viewTimetable, setViewTimetable] = useState(false);
    const [periodInputs, setPeriodInputs] = useState({});
    const [selectedDay, setSelectedDay] = useState('');

    const handleDayChange = (event) => {
        setSelectedDay(event.target.value);
    };

    const handlePeriodChange = (day, period, value) => {
        setPeriodInputs((prevInputs) => ({
            ...prevInputs,
            [day]: {
                ...prevInputs[day],
                [period]: value,
            },
        }));
    };

    const handleSubmit = () => {
        const updatedTimetable = days.map((day) => ({
            day,
            periods: periods.map((period) => ({
                periodNumber: period.toString(),
                value: periodInputs?.[day]?.[period] || '',
            })),
        }));

        setTimetable(updatedTimetable);
        setViewTimetable(true);
    };

    const getPeriodValue = (day, period) => periodInputs?.[day]?.[period] || '';

    return (
        <div>
            <h2>Timetable Editor</h2>
            <Select value={selectedDay} onChange={handleDayChange} displayEmpty fullWidth>
                <MenuItem value=''>--Select Day--</MenuItem>
                {days.map((day) => (
                    <MenuItem key={day} value={day}>
                        {day}
                    </MenuItem>
                ))}
            </Select>
            {selectedDay && (
                <div>
                    <Typography variant="h3">{selectedDay}</Typography>
                    {periods.map((period) => (
                        <div key={period}>
                            <Typography variant="subtitle1">Period {period}:</Typography>
                            <TextField
                                variant="outlined"
                                value={getPeriodValue(selectedDay, period)}
                                onChange={(event) => handlePeriodChange(selectedDay, period, event.target.value)}
                                sx={{
                                    '& .MuiOutlinedInput-input': {
                                        padding: '8px 12px', // Adjust the padding to change the height
                                    },
                                }}
                            />
                        </div>
                    ))}
                </div>
            )}
            <Button style={{ padding: '10px', marginTop: '10px' }} variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
            {viewTimetable && (
                <div>
                    <h2>Timetable View</h2>
                    <TableContainer component={Paper}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ border: "1px solid black" }}>Day</TableCell>
                                    {periods.map((period) => (
                                        <TableCell style={{ border: "1px solid black" }} key={period}>
                                            Period {period}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHead>

                            <TableBody>
                                {
                                    timetable.map((entry) => (
                                        <TableRow key={entry.day}>
                                            <TableCell style={{ border: "1px solid black" }}>{entry.day}</TableCell>
                                            {entry.periods.map((period) => (
                                                <TableCell style={{ border: "1px solid black" }} key={period.periodNumber}>
                                                    {period.value}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            )}
        </div>


    );
};

export default Timetable;