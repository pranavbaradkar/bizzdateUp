
import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Form, Button } from 'react-bootstrap';
import { motion } from 'framer-motion';

const FourthStep = (props) => {
  const { user } = props;
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      github: user.github,
      linkdn: user.linkdn,
      startup_name: user.startup_name,
      startup_link: user.startup_link,
    }
  });
  const onSubmit = (data) => {
    props.updateUser(data);
    props.history.push('/third');
  };

  return (
    <Form className="input-form" onSubmit={handleSubmit(onSubmit)}>
      <motion.div
        className="col-md-6 offset-md-3"
        initial={{ x: '-100vw' }}
        animate={{ x: 0 }}
        transition={{ stiffness: 150 }}
      >
        <Form.Group controlId="github">
          <Form.Label>Github URL</Form.Label>
          <Form.Control
            type="url"
            name="github"
            placeholder="Enter your github URL"
            autoComplete="off"
            ref={register({
              pattern: 'https?://.+'
            })}
            className={`${errors.github ? 'input-error' : ''}`}
          />
          {errors.phone && (
            <p className="errorMsg">{errors.github.message}</p>
          )}
        </Form.Group>

        {/* <Form.Group controlId="gender">
          <Form.Label>gender</Form.Label>
          <Form.Control
            type="text"
            name="gender"
            placeholder="gender"
            autoComplete="off"
            ref={register({
              required: 'gender is required.',
            })}
            className={`${errors.gender ? 'input-error' : ''}`}
          />
          {errors.gender && (
            <p className="errorMsg">{errors.gender.message}</p>
          )}
        </Form.Group> */}
        <Form.Group controlId="linkdn">
          <Form.Label>Linkdn URL</Form.Label>
          <Form.Control
            type="url"
            name="linkdn"
            placeholder="Enter your Linkdn URL"
            autoComplete="off"
            ref={register({
              pattern: 'https?://.+'
            })}
            className={`${errors.linkdn ? 'input-error' : ''}`}
          />
          {errors.phone && (
            <p className="errorMsg">{errors.linkdn.message}</p>
          )}
        </Form.Group>

        <Form.Group controlId="startup_name">
          <Form.Label>Startup Name</Form.Label>
          <Form.Control
            type="text"
            name="startup_name"
            placeholder="Enter your Startup name"
            autoComplete="off"
            ref={register({
              required: 'startup name is required.',
              pattern: {
                value: /^[a-zA-Z]+$/,
                message: 'startup name should contain only characters.'
              }
            })}
            className={`${errors.startup_name ? 'input-error' : ''}`}
          />
          {errors.first_name && (
            <p className="errorMsg">{errors.startup_name.message}</p>
          )}
        </Form.Group>

 

        <Form.Group controlId="startup_link">
          <Form.Label>Company website</Form.Label>
          <Form.Control
            type="url"
            name="startup_link"
            placeholder="Enter your company website"
            autoComplete="off"
            ref={register({
              pattern: 'https?://.+'
            })}
            className={`${errors.startup_link ? 'input-error' : ''}`}
          />
          {errors.phone && (
            <p className="errorMsg">{errors.startup_link.message}</p>
          )}
        </Form.Group>
       

        <Button variant="primary" type="submit">
          Next
        </Button>
      </motion.div>
    </Form>
  );
};

export default FourthStep;
