//export const PREFIX_MENU = 'rs_';

export const  getMenuDataById = (menus, menuId) => {
  let ret = null;
  for(let item of menus){
    if(item.id === menuId){
      ret = item;
      break;
    }
  }
  return ret;
};

export const  isNewRecord = (menuId) => {
  if( !menuId ){
    return false;
  }

  if( menuId[0]+menuId[1]+menuId[2] === 'rs_'){
    return true;
  }
  return false;
};


// export const getPagesByMenuId = ( menuId ) => {
//   let pages = [];
//   if(isNewRecord(menuId)){
//     return pages;
//   }
//
//   for(let page of this.props.pages){
//     if( page.menu_id === menuId ){
//       pages.push(page);
//     }
//   }
//   return pages;
// }


export const getPagesByMenuId = ( allPages, menuId ) => {
  let pages = [];
  if(isNewRecord(menuId)){
    return pages;
  }

  for(let page of allPages){
    if( !menuId &&  !page.menu_id){
      pages.push(page);
    }else if( parseInt(page.menu_id) === menuId ){
      pages.push(page);
    }
  }
  return pages;
}
