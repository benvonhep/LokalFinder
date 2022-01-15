import React, { useState, useEffect } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { HOSTNAME } from '../../environment';

import './LinkWrapper.scss';

export default function LinkWrapper({ link }) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const url = new URL(link);

  // useEffect(() => {
  //   console.log(link, url, 'LJLKJLKJLKJ');
  // }, [url]);

  if (url.hostname === HOSTNAME) {
    return (
      <a target="_blank" href={link} rel="noopener noreferrer">
        {link}
      </a>
    );
  }
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
            dialogClassName="linkwrapper-modal"
          >
            <Modal.Title className="linkwrapper-modal-title-footer">
              Blog Post
            </Modal.Title>
            <Modal.Body dialogclassname="linkwrapper-modal-body">
              <iframe
                name="external-bloglink"
                src={url.href}
                aria-label="original blog"
                className="linkwrapper-html-object"
                style={{ border: 'none' }}
                referrerpolicy="no-referrer"
              />
            </Modal.Body>
            <Modal.Footer className="linkwrapper-modal-title-footer">
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
