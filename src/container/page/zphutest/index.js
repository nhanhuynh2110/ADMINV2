import React from 'react'

export default class PhuTest extends React.PureComponent {
  render () {
    return (
      <form>
        <section className='content'>
          <div className="row">
            <div className='col-md-12'>
              <div className='box box-primary collapsed-box'>
                <div class="box-header with-border">
                  <h3 class="box-title">Info</h3>
                  <div class="box-tools pull-right">
                    <button type="button" class="btn btn-box-tool" data-widget="collapse"><i class="fa fa-plus"></i></button>
                  </div>
                </div>
                <div className='box-body' style={{ display: 'block' }}>
                  <div className='row'>
                    <div class="col-md-2">
                      <img class="w-100 camera-image" src="http://localhost:3100/file-manager/gtz5s_1.jpg" />
                    </div>
                    <div className='col-md-5'>
                      <div class="form-group">
                        <label>Title &nbsp;</label>
                        <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="BÌNH MF GTZ5S (12V-3.5AH)" />
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Category &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="ẮC QUY XE GẮN MÁY" />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Code &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="GTZ5S" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className='col-md-5'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Producer &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="GS" />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Barcode &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="unit" />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Quantity &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="200" />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Unit &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="bottle" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='col-md-5'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Price Cost &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="100,000" />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Price Cost VAT &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="110,000" />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Price Sale &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="120,000" />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Price Sale VAT &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="132,000" />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className='col-md-5'>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Minimum purchase &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="100" />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Maximum purchase &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="300" />
                          </div>
                        </div>
                      </div>
                      <div className='row'>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Minimum sell &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="80" />
                          </div>
                        </div>
                        <div className='col-md-6'>
                          <div class="form-group">
                            <label>Maximum sell &nbsp;</label>
                            <input class="form-control" id="pro-title-id" placeholder="please input title" name="title" value="280" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </form>
    )
  }
}