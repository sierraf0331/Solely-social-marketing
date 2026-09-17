const toggle=document.querySelector('.menu-toggle');
const links=document.querySelector('.nav-links');
toggle.addEventListener('click',()=>links.classList.toggle('open'));
document.querySelectorAll('.nav-links a').forEach(a=>a.addEventListener('click',()=>links.classList.remove('open')));
document.getElementById('year').textContent=new Date().getFullYear();

const form=document.getElementById('contact-form');
const successMessage=document.getElementById('form-success');
const errorMessage=document.getElementById('form-error');

form.addEventListener('submit',async(e)=>{
  e.preventDefault();
  successMessage.hidden=true;
  errorMessage.hidden=true;

  const submitButton=form.querySelector('button[type="submit"]');
  const originalText=submitButton.textContent;
  submitButton.disabled=true;
  submitButton.textContent='Sending...';

  try{
    const response=await fetch(form.action,{
      method:'POST',
      body:new FormData(form),
      headers:{'Accept':'application/json'}
    });

    if(response.ok){
      form.reset();
      form.hidden=true;
      successMessage.hidden=false;
    }else{
      errorMessage.hidden=false;
    }
  }catch(error){
    errorMessage.hidden=false;
  }finally{
    submitButton.disabled=false;
    submitButton.textContent=originalText;
  }
});