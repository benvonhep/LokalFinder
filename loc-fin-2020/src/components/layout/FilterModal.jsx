
// https://codesandbox.io/s/upbeat-ramanujan-b2jui?file=/src/Search.js:0-3336


import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

import './FilterModal.scss'

const  FilterModal = (props)=> {

  const { activeFilter, setActiveFilter, filterCategories, testlog, onHide, ...rest} = props;
  const onCancel = () => {
    onHide()
    // dispatch(resetLocation())
  }

  const onFilterChange = (filter) => {
    let filterCatMAP = Object.entries(filterCategories);
    if (filter === 'ALL') {
      if ( activeFilter && Object.entries(activeFilter).length === filterCategories.length){
        setActiveFilter([])
      } else {
        let newFilter = filterCatMAP.map(item => item[1].value)
        setActiveFilter(newFilter)
      }
    } else {

      let activeEntries = activeFilter ? Object.values(activeFilter).find(obj => {
        if (obj === filter) return true;
      }) : [];

      if (activeEntries) {
        const filterIndex = activeFilter ? activeFilter.indexOf(filter) : undefined || null;
        const newFilter = [...activeFilter];
        newFilter.splice(filterIndex, 1);
        setActiveFilter(newFilter);
      } else {
        if(activeFilter){setActiveFilter([...activeFilter, filter])}
      }
    }
  }

  return (

      <Modal
        {...rest}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
        animation={false}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header className="modalHeader">
          <Modal.Title id="contained-modal-title-vcenter">
            {testlog ? <> Filter {testlog}</> : <div>loading...</div>}
            <Button onClick={() => {console.log(activeFilter, 'bkabka')}}>Tets</Button>
          </Modal.Title>
          <Button size="sm" variant="outline-secondary" onClick={onCancel}>Close</Button>
        </Modal.Header>
        <Modal.Body>

          <>
            <form>

              <div>
                <input
                  id="selectAll"
                  type="checkbox"
                  label="All"
                  onChange={() => onFilterChange("ALL")}
                  checked={activeFilter ? activeFilter.length === filterCategories.length : false}
                  />
                  <label htmlFor="selectAll" className="ml-1">All</label>
                {/* {' '}All */}
              </div>
          {filterCategories && filterCategories.map((filterItem, index) => (
              <div className="mb-1" key={filterItem.id}>
                <input
                  type="checkbox"
                  name={filterItem.name}
                  id={index}
                  label={filterItem.name}
                  onChange={() => onFilterChange(filterItem.value)}
                  checked={activeFilter ? activeFilter.includes(filterItem.value) : false}
                  />  {filterItem.name}
              </div>



            ))}
            </form>
          </>
        </Modal.Body>
      </Modal>

  )
}
export default FilterModal;






// import React, { useEffect, useState } from 'react'
// import { Button, Form, Modal } from 'react-bootstrap';
//
// import './FilterModal.scss'
//
// const  FilterModal = (props)=> {
//
//   const { setActiveFilter, activeFilter, testlog, onHide, ...rest} = props;
//   const { filterChecked, setFilterChecked } = useState([])
//
//   const onCancel = () => {
//     onHide()
//     // dispatch(resetLocation())
//   }
//
//
//   const tets = () => {
//     console.log('filtermodal change tets');
//   }
//
//
//
//   const handleSelect = (filterItem) => {
//     let items = Object.keys(activeFilter);
//
//     console.log(filterItem, 'FILTERITEM')
//     console.log(activeFilter, 'ACTIVEFILTER');
//
//
//   }
//
//
//
// const allCategories =
// [
//   'breakfast',
//   'lunch',
//   'dinner',
//   // 'brunch',
//   // 'african',
//   // 'american',
//   // 'asian',
//   // 'arabic',
//   // 'european',
//   // 'other',
//   // 'casual',
//   // 'fancy'
// ]
//
//
//   return (
//
//       <Modal
//         {...rest}
//         size="lg"
//         aria-labelledby="contained-modal-title-vcenter"
//         centered
//         onKeyPress={(e) => { e.key === 'Enter' && e.preventDefault(); }}
//         animation={false}
//         backdrop="static"
//         keyboard={false}
//       >
//         <Modal.Header className="modalHeader">
//           <Modal.Title id="contained-modal-title-vcenter">
//             {activeFilter ? <> Filter {testlog}</> : <div>loading...</div>}
//             <Button onClick={() => {console.log(activeFilter, 'bkabka'); tets()}}>Tets</Button>
//           </Modal.Title>
//           <Button size="sm" variant="outline-secondary" onClick={onCancel}>Close</Button>
//         </Modal.Header>
//         <Modal.Body>
//
//           {allCategories && Array.from(allCategories).map((i, index) => (
//
//             <div className="mb-1" key={index}>
//               <input
//                 type="checkbox"
//                 name={i}
//                 id={index}
//                 label={i}
//                 onChange={() => handleSelect(i)}
//                 />  {i}
//             </div>
//
//
//
//                 ))}
//
//         </Modal.Body>
//       </Modal>
//
//   )
// }
// export default FilterModal;