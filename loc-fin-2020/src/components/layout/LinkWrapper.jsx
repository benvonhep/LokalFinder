import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { HOSTNAME } from '../../environment';

import './LinkWrapper.scss';

export default function LinkWrapper({ link }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const url = new URL(link);

  if (url.hostname === HOSTNAME)
    return (
      <a target="_blank" href={link} rel="noopener noreferrer">
        {link}
      </a>
    );
  return (
    <>
      {link && (
        <>
          <Button
            className="linkwrapper-blogpost"
            variant="outline-warning"
            size="sm"
            onClick={handleShow}
          >
            Blog Post
          </Button>

          <Modal
            show={show}
            onHide={handleClose}
            style={{ minWidth: '600px !important' }}
            dialogClassName="linkwrapper-modal"
          >
            <Modal.Title style={{ backgroundColor: '#172a28' }}>
              Blog Post
            </Modal.Title>
            <Modal.Body dialogclassname="linkwrapper-modal-body">
              <object
                type="text/html"
                data={link}
                aria-label="original blog"
                className="linkwrapper-html-object"
              />
            </Modal.Body>
            <Modal.Footer style={{ backgroundColor: '#172a28' }}>
              <Button variant="secondary" size="sm" onClick={handleClose}>
                Close
              </Button>
            </Modal.Footer>
          </Modal>
        </>
      )}
      {!link && <div>Sorry, the link is not valid...</div>}
    </>
  );
}
