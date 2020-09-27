import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions/products';
import ImageProduct from './ImageProduct';
import { getImages } from '../../helpers/pages';

class AddProduct extends Component {

  componentDidMount() {
    this.props.getShopPages();
    this.props.getProducts( (d) => {
    });
  }

  getShopPages = () => {
    let shopPages = [];

    shopPages.push('');
    if(this.props.shop_pages){
      for(var shopPage of  this.props.shop_pages){
          shopPages.push(shopPage);
      }
    }
    return shopPages;
  }

  handleSubmit = (event) => {
    event.preventDefault();

    const product = { ...this.props.product};

    if(this.images && product.images){
      product.images = product.images.concat(this.images);
    }

    this.props.saveProduct(product, ( productId ) => {
      document.getElementsByName('images')[0].value = null;
      this.images = [];
      this.props.getProducts( (d) => {
      });
      this.setState({productsCheck: null});
    });
  };

  handleChangeProduct = (event) => {
    let newProductData;
    newProductData = { ...this.props.product, [event.target.name]: event.target.value};

    this.props.changeProduct(newProductData);
  }

  showImages = (images, productId) => {
      let ret = '';
      if(Array.isArray(images)){

        ret = images.map(function(item, index){
          return  <ImageProduct key={item.id} imageId={item.id}  productId={productId} />
        });
      }

      return ret;
  }

  createImage = (files) => {

    this.images = [];
    for (let i = 0; i < files.length; i++)  //for multiple files
    {
        let f = files[i];
        let name = files[i].name;
        let reader = new FileReader();

        reader.onload = (e) => {
            this.images.push({ data: e.target.result, name: name});
        }
        reader.readAsDataURL(f);
        //reader.readAsText(f,"UTF-8");
    }
  }


  handleUploadFile = (event) => {
    const files = event.target.files;
    if (files.length){
      this.createImage(files);
    }
  }

  render() {

    let images = [];

    if(this.props.product.id){
       images = getImages( this.props.products, this.props.product.id );
    }

    let shopPages = [];
    shopPages = this.getShopPages();

    const label =  this.props.product.id ? 'Edit product' : 'Add product';

    return (

      <div>

        <form onSubmit={this.handleSubmit}>
          <button type="submit" className="add-page-btn  btn btn-primary mt-2 mb-2"><i className="fas fa-plus"></i> {label}</button>
          <div className="form-group">
              <input type="text" placeholder="Name" name="name" className="form-control col-5"
                  onChange={this.handleChangeProduct} value={this.props.product.name || ''} />
          </div>

          <div className="form-group">
              <input type="text" placeholder="Sku" name="sku" className="form-control col-5"
                  onChange={this.handleChangeProduct} value={this.props.product.sku || ''} />
          </div>

          <div className="form-group">
              <input type="text" placeholder="Price" name="price" className="form-control col-5"
                  onChange={this.handleChangeProduct} value={this.props.product.price || ''} />
          </div>

          <div className="form-group">
           <label htmlFor="comment">Description</label>
           <textarea className="form-control" rows="5" name="description"  onChange={this.handleChangeProduct}  value={this.props.product.description || ''}></textarea>
         </div>

          <div className="form-group">
            <select name="page_id" onChange={this.handleChangeProduct}  value={this.props.product.page_id || ''} >
              {shopPages.map(page =>
                <option key={page.id} value={page.id || ''}>{page.title || ''}</option>
              )}
            </select>
            <label className="ml-1">Page</label>
          </div>


         <div className="form-group">
          <input type="file" name="images"  onChange={this.handleUploadFile} multiple/>
         </div>

         {this.showImages(images, this.props.product.id )}

        </form>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    product: state.products.product,
    products: state.products.products,
    shop_pages: state.products.shop_pages
  };
}

export default connect(mapStateToProps, actions)(AddProduct);
