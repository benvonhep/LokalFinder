
// https://codesandbox.io/s/upbeat-ramanujan-b2jui?file=/src/Search.js:0-3336


import React, { useEffect, useState } from 'react'
import { Button, Form, Modal } from 'react-bootstrap';

import './FilterModal.scss'

const  FilterModal = (props)=> {

  const { activeFilter, setActiveFilter, filterCategories, setFilterCategories, testlog, onHide, ...rest} = props;
  const [ filterMap, setFilterMap] = useState();
  const onCancel = () => {
    onHide()
    // dispatch(resetLocation())
  }

  useEffect(() => {
    let filterCatMapped = new Map(Object.entries(filterCategories));
    setFilterMap(filterCatMapped);
    let map = filterCatMapped.forEach(({name, value}, index) => console.log(`${name}:${value}, ${index}`))
    console.log(map, 'FILTERCATMAPPED**')

    // Object.keys(filterCategories).map(key =>
    //   {
    //     console.log(filterCategories[key], 'KEY')
    //     console.log(key, 'key')
    //   }
    //   )
  }, [])

  const onFilterChange = (filterItem, e) => {
    // let filterCatMAP = Object.entries(filterCategories);
    if (filterItem === 'ALL') {
      console.log(filterItem, 'FILTERITEM')
      console.log(filterCategories, 'FILTERCAT');
      console.log(Object.entries(filterCategories), 'FILTERCATOBJENtries');
      if ( filterCategories && Object.entries(filterCategories).indexOf(false) <= 0){
        return;
      } else {
        filterCategories.map(filter =>
          console.log(filter, 'Filter ALL With False')
//           setFilterCategories((prevState) => ({
//
//           ...prevState,
//           [filter.value]: true
//         }))

        )
      }
    } else {
      console.log(filterItem, '#FILTER#ITEM#')
      setFilterCategories((prevState) => ({
        ...prevState,
        [filterItem.id]: {...prevState[filterItem.id], value: !filterCategories[filterItem.id].value}  })
      // ({
      //   ...prevState,
      //   [filterItem.id]: filterItem.value: !filterItem.value
      // })
      )
    }
  }
//   const onFilterChange = (filter) => {
//     let filterCatMAP = Object.entries(filterCategories);
//     if (filter === 'ALL') {
//       if ( activeFilter && Object.entries(activeFilter).length === filterCategories.length){
//         setActiveFilter([])
//       } else {
//         let newFilter = filterCatMAP.map(item => item[1].value)
//         setActiveFilter(newFilter)
//       }
//     } else {
//
//       let activeEntries = activeFilter ? Object.values(activeFilter).find(obj => {
//         if (obj === filter) return true;
//       }) : [];
//
//       if (activeEntries) {
//         const filterIndex = activeFilter ? activeFilter.indexOf(filter) : undefined || null;
//         const newFilter = [...activeFilter];
//         newFilter.splice(filterIndex, 1);
//         setActiveFilter(newFilter);
//       } else {
//         if(activeFilter){setActiveFilter([...activeFilter, filter])}
//       }
//     }
//   }

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
          <Button onClick={() => {console.log(filterCategories, 'bkabka')}}>Tets</Button>
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
                checked={filterCategories ? Object.entries(filterCategories).indexOf(false) <= 0  : false}
                />
                <label htmlFor="selectAll" className="ml-1">All</label>
              {/* {' '}All */}
            </div>
            {filterCategories && Object.keys(filterCategories).map(key =>
                <div className="mb-1" key={key}>
                <input
                  type="checkbox"
                  name={filterCategories[key].name}
                  id={filterCategories[key].id}
                  onChange={() => onFilterChange(filterCategories[key])}
                  // value="true"
                  checked={filterCategories[key].value === true ? true : false}
                  />
                  <label htmlFor={filterCategories[key].name} className="ml-1">{filterCategories[key].name}</label>
              </div>
              )



            }
            {/* {filterMap && filterMap.forEach(({name, value}, index) =>
              <div>`${name}: ${value} ${index}`</div>
            )



            } */}
          {/* {filterCategories && Object.entries(filterCategories).map((filterItem, index) => (
            <div className="mb-1" key={index}>
              <input
                type="checkbox"
                name={filterItem.name}
                id={filterItem.id}
                label={filterItem.name}
                onChange={() => onFilterChange(filterItem)}
                checked={filterCategories ? filterCategories + "." + filterItem.value : false}
                />  {filterItem.name}
                <label htmlFor={filterItem.name} className="ml-1">{filterItem.name}</label>
            </div>
          ))} */}
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