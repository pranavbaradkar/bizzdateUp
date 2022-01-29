import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import csc from 'country-state-city';
import axios from 'axios';
import { motion } from 'framer-motion';
import Swal from 'sweetalert2';
import { BASE_API_URL } from '../utils/constants';
import ToggleButton from "react-bootstrap/ToggleButton";
import ToggleButtonGroup from "react-bootstrap/ToggleButtonGroup";


const ThirdStep = (props) => {
  const [value, setValue] = useState([]);
  const [valueH, setValueH] = useState([]);
  const [disable, setdisable] = useState(false);
  const [disableH, setdisableH] = useState(false);
  const [isLoading, setIsLoading] = useState(false); 
  const[selectedSkills,setSelectedSkills] = useState([]); 
  const [selectedstartup_age, setSelectedstartup_age] = useState('');

  const { user } = props;
  const { register, errors } = useForm({
    defaultValues: {
      description: user.description
    }
  });

  let skills = [
    {
      id: 1 ,
      name: 'Cpp',
      select: false
    },
    {
      id: 2 ,
      name: 'Management',
      select: false
    },
    {
      id: 3,
      name: 'Development',
      select: false
    },
    {
      id: 4 ,
      name: 'Frontend',
      select: false
    },
    {
      id: 5 ,
      name: 'Backend',
      select: false
    },

  ];

  let startup_age = [
    {
      id: 1 ,
      name: 'Ideation'
    },
    {
      id: 2 ,
      name: 'launch'
    },
    {
      id: 3,
      name: 'Early'
    },
    {
      id: 4 ,
      name: 'Growth'
    },
    {
      id: 5 ,
      name: 'Scale'
    },

  ];

  useEffect(() => {
    const getstartup_age = async () => {
      try {
        setIsLoading(true);
        // allCountries = result?.map(({ isoCode, name }) => ({
        //   isoCode,
        //   name
        // }));
        const [{ id: first_startup_age } = {}] = startup_age;
        setSelectedstartup_age(first_startup_age);
        setIsLoading(false);
      } catch (error) {
        setIsLoading(false);
      }
    };

    getstartup_age();
  }, []);




  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      const { user } = props;
      let sk = '' ; 
      console.log(value.length) ; 
      // for (var i=0; i< value.length; i++) {
      //   //console.log(value[i]);
      //   sk += skills[value[i]].name + ' ' ; 
      // }
      //console.log(sk) ; 
      const updatedData = {
        startup_age: startup_age.find(
          (startup_age) => {
          return (startup_age.id == selectedstartup_age)
          }
        )?.name,
        skill: value,
        skillH: valueH
      };



      console.log(updatedData)
      await axios.post(`${BASE_API_URL}/register`, {
        ...user,
        ...updatedData
      });
      Swal.fire('Awesome!', "You're successfully registered!", 'success').then(
        (result) => {
          if (result.isConfirmed || result.isDismissed) {
            props.resetUser();
            props.history.push('/');
          }
        }
      );
    } catch (error) {
      if (error.response) {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: error.response.data
        });
        console.log('error', error.response.data);
      }
    }
  };
  const handleChange = val => { 


    setValue(val) ; 
    let state = (value.length > 2) ? true : false ; 
    // setdisable(state) ; 
    console.log(value) ; 
  };

  const handleChangeH = val => {
    let state = (valueH.length > 2) ? true : false ; 
    // setdisableH(state) ; 
    setValueH(val) ; 
  };

  return (
    <Form className="input-form" onSubmit={handleSubmit}>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}
      >
        <Form.Group controlId="startup_age">
          {isLoading && (
            <p className="loading">Loading. Please wait...</p>
          )}
          <Form.Label>Startup Stage</Form.Label>
          <Form.Control
            as="select"
            name="startup_age"
            value={selectedstartup_age}
            onChange={(event) => setSelectedstartup_age(event.target.value)}
          >
            {startup_age.map(({ id, name }) => (
              <option value={id} key={id}>
                {name}
              </option>
            ))}
          </Form.Control>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Startup Description</Form.Label>
          <Form.Control
            type="text"
            name="startup_name"
            placeholder="Describe your startup"
            autoComplete="off"
            ref={register({
              required: 'startup description is required.',
            })}
            className={`${errors.description ? 'input-error' : ''}`}
          />
          {errors.first_name && (
            <p className="errorMsg">{errors.description.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="skills">
          <Form.Label>Skills want</Form.Label>
          <ToggleButtonGroup type="checkbox" value={value} onChange={handleChange}>
        {skills.map(
            ({id, name}) => (
              <ToggleButton disabled = {disable} variant="danger" id = 'tbg-btn-${id}' value={id}>{name}</ToggleButton>
          ))}
        </ToggleButtonGroup>
        </Form.Group>

        <Form.Group controlId="skillsH">
          <Form.Label>Skills has</Form.Label>
          <ToggleButtonGroup type="checkbox" value={valueH} onChange={handleChangeH}>
        {skills.map(
            ({id, name}) => (
              <ToggleButton disabled = {disableH} variant="danger" id = "tbg-btn-${id}" value={id}>{name}</ToggleButton>
          ))}
        </ToggleButtonGroup>
        </Form.Group>





        <Button variant="primary" type="submit">
          Register
        </Button>
      </motion.div>
    </Form>
  );
};

export default ThirdStep;
